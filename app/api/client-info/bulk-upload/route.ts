import { NextResponse } from "next/server"
import * as XLSX from "xlsx"
import connectDb from "@/lib/db/db"
import ClientInfo from "@/lib/Models/client-info"

export async function POST(req: Request) {
  try {
    // console.log("Starting bulk upload process...")
    await connectDb()
    // console.log("Database connection established")

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      // console.log("Error: No file provided")
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    // console.log(`File received: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} KB`)

    // Check file type
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      // console.log(`Error: Invalid file format - ${file.name}`)
      return NextResponse.json(
        { message: "Invalid file format. Please upload an Excel file (.xlsx or .xls)" },
        { status: 400 },
      )
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      // console.log(`Error: File size exceeds limit - ${(file.size / (1024 * 1024)).toFixed(2)} MB`)
      return NextResponse.json({ message: "File size exceeds the 10MB limit" }, { status: 400 })
    }

    // Read the file
    // console.log("Reading Excel file...")
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: "array" })
    // console.log(`Workbook loaded. Sheets found: ${workbook.SheetNames.join(", ")}`)

    // Process the main client info sheet
    const clientInfoSheet = workbook.Sheets["Client Information"]
    if (!clientInfoSheet) {
      // console.log("Error: Client Information sheet not found")
      return NextResponse.json({ message: "Invalid template: Client Information sheet not found" }, { status: 400 })
    }

    const clientInfoData = XLSX.utils.sheet_to_json(clientInfoSheet)
    // console.log(`Client Information sheet contains ${clientInfoData.length} rows`)
    // console.log("Sample client data:", JSON.stringify(clientInfoData[0], null, 2))

    // Process additional sheets
    const googleWorkspaceSheet = workbook.Sheets["Google Workspace"]
    const emailAccountsSheet = workbook.Sheets["Email Accounts"]
    const additionalServicesSheet = workbook.Sheets["Additional Services"]

    const googleWorkspaceData = googleWorkspaceSheet ? XLSX.utils.sheet_to_json(googleWorkspaceSheet) : []
    const emailAccountsData = emailAccountsSheet ? XLSX.utils.sheet_to_json(emailAccountsSheet) : []
    const additionalServicesData = additionalServicesSheet ? XLSX.utils.sheet_to_json(additionalServicesSheet) : []

    // console.log(`Google Workspace sheet contains ${googleWorkspaceData.length} rows`)
    // console.log(`Email Accounts sheet contains ${emailAccountsData.length} rows`)
    // console.log(`Additional Services sheet contains ${additionalServicesData.length} rows`)

    // Prepare for import
    const results = {
      total: clientInfoData.length,
      successful: 0,
      failed: 0,
      errors: [] as Array<{ row: number; message: string }>,
    }

    // console.log(`Starting to process ${results.total} clients...`)

    // Process each client
    for (let i = 0; i < clientInfoData.length; i++) {
      try {
        const clientRow = clientInfoData[i] as any
        // console.log(`\n--- Processing client row ${i + 1} ---`)

        // Skip empty rows
        if (!clientRow["Client Name*"]) {
          console.log(`Row ${i + 1}: Empty client name, skipping`)
          continue
        }

        const clientName = clientRow["Client Name*"]
        // console.log(`Processing client: ${clientName}`)

        // Find related Google Workspace data
        const googleWorkspace = googleWorkspaceData.find((row: any) => row["Client Name*"] === clientName) as any
        // console.log(`Google Workspace data found: ${googleWorkspace ? "Yes" : "No"}`)
        if (googleWorkspace) {
          // console.log("Google Workspace data:", JSON.stringify(googleWorkspace, null, 2))
        }

        // Find related email accounts
        const emailAccounts = emailAccountsData
          .filter((row: any) => row["Client Name*"] === clientName)
          .map((row: any) => ({
            emailAddress: row["Email Address"] || "",
            password: row["Password"] || "",
            loginUrl: row["Login URL"] || "",
            notes: row["Notes"] || "",
          }))
          .filter((account) => account.emailAddress)

        // console.log(`Email accounts found: ${emailAccounts.length}`)
        if (emailAccounts.length > 0) {
          // console.log("Email accounts sample:", JSON.stringify(emailAccounts[0], null, 2))
        }

        // Find related additional services
        const additionalServices = additionalServicesData
          .filter((row: any) => row["Client Name*"] === clientName)
          .map((row: any) => {
            // Safely parse date or return undefined
            let expiryDate
            try {
              if (row["Expiry Date (YYYY-MM-DD)"]) {
                expiryDate = new Date(row["Expiry Date (YYYY-MM-DD)"])
                // Check if date is valid
                if (isNaN(expiryDate.getTime())) {
                  expiryDate = undefined
                }
              }
            } catch (e) {
              expiryDate = undefined
            }

            return {
              serviceName: row["Service Name"] || "",
              serviceType: row["Service Type"] || "",
              loginUrl: row["Login URL"] || "",
              username: row["Username"] || "",
              password: row["Password"] || "",
              expiryDate: expiryDate,
              notes: row["Notes"] || "",
            }
          })
          .filter((service) => service.serviceName)

        // console.log(`Additional services found: ${additionalServices.length}`)
        if (additionalServices.length > 0) {
          // console.log("Additional services sample:", JSON.stringify(additionalServices[0], null, 2))
        }

        // Safely parse domain expiry date
        let domainExpiryDate
        try {
          if (clientRow["Domain Expiry Date* (YYYY-MM-DD)"]) {
            // Handle Excel date format (number of days since 1900-01-01)
            if (typeof clientRow["Domain Expiry Date* (YYYY-MM-DD)"] === "number") {
              // Convert Excel date to JavaScript date
              const excelDate = clientRow["Domain Expiry Date* (YYYY-MM-DD)"]
              // Excel's epoch starts on 1900-01-01, but it incorrectly treats 1900 as a leap year
              // So we need to adjust by subtracting 1 for dates after 1900-02-28
              const adjustedDate = excelDate > 59 ? excelDate - 1 : excelDate
              const millisecondsPerDay = 24 * 60 * 60 * 1000
              domainExpiryDate = new Date(Date.UTC(1900, 0, adjustedDate, 0, 0, 0))
            } else {
              domainExpiryDate = new Date(clientRow["Domain Expiry Date* (YYYY-MM-DD)"])
            }

            // Check if date is valid
            if (isNaN(domainExpiryDate.getTime())) {
              domainExpiryDate = undefined
            }
          }
        } catch (e) {
          // console.log(`Error parsing domain expiry date: ${e}`)
          domainExpiryDate = undefined
        }

        // Safely parse Google Workspace renewal date and monthly fee
        let renewalDate
        let monthlyFee

        if (googleWorkspace) {
          try {
            if (googleWorkspace["Renewal Date (YYYY-MM-DD)"]) {
              renewalDate = new Date(googleWorkspace["Renewal Date (YYYY-MM-DD)"])
              // Check if date is valid
              if (isNaN(renewalDate.getTime())) {
                renewalDate = undefined
              }
            }
          } catch (e) {
            // console.log(`Error parsing renewal date: ${e}`)
            renewalDate = undefined
          }

          try {
            if (googleWorkspace["Monthly Fee"] && googleWorkspace["Monthly Fee"] !== "-") {
              monthlyFee = Number.parseFloat(googleWorkspace["Monthly Fee"])
              // Check if number is valid
              if (isNaN(monthlyFee)) {
                monthlyFee = undefined
              }
            }
          } catch (e) {
            // console.log(`Error parsing monthly fee: ${e}`)
            monthlyFee = undefined
          }
        }

        // Prepare client data
        const clientData = {
          clientName: clientRow["Client Name*"],
          clientCode: clientRow["Client Code"] || "",
          contactPerson: clientRow["Contact Person"] || "",
          contactEmail: clientRow["Contact Email"] || "",
          contactPhone: clientRow["Contact Phone"] || "",
          notes: clientRow["Notes"] || "",
          domain: {
            name: clientRow["Domain Name*"] || "",
            purchasePlatform: clientRow["Domain Purchase Platform*"] || "",
            loginUrl: clientRow["Domain Login URL*"] || "",
            username: clientRow["Domain Username*"] || "",
            password: clientRow["Domain Password*"] || "",
            expiryDate: domainExpiryDate,
            autoRenewal: clientRow["Domain Auto Renewal (TRUE/FALSE)"] === "TRUE",
            registrar: clientRow["Domain Registrar"] || "",
            notes: clientRow["Domain Notes"] || "",
          },
          googleWorkspace: googleWorkspace
            ? {
                accountName: googleWorkspace["Account Name"] || "",
                adminEmail: googleWorkspace["Admin Email"] || "",
                adminPassword: googleWorkspace["Admin Password"] || "",
                loginUrl: googleWorkspace["Login URL"] || "",
                subscriptionType: googleWorkspace["Subscription Type"] || "",
                monthlyFee: monthlyFee,
                renewalDate: renewalDate,
                emailAccounts,
                notes: googleWorkspace["Notes"] || "",
              }
            : {
                emailAccounts,
              },
          website: {
            technology: clientRow["Website Technology*"] || "",
            framework: clientRow["Website Framework"] || "",
            hostingProvider: clientRow["Website Hosting Provider*"] || "",
            serverType: clientRow["Website Server Type"] || "",
            serverUrl: clientRow["Website Server URL*"] || "",
            cpanelUrl: clientRow["Website cPanel URL"] || "",
            username: clientRow["Website Username*"] || "",
            password: clientRow["Website Password*"] || "",
            databaseName: clientRow["Website Database Name"] || "",
            databaseUsername: clientRow["Website Database Username"] || "",
            databasePassword: clientRow["Website Database Password"] || "",
            sshAccess: clientRow["Website SSH Access (TRUE/FALSE)"] === "TRUE",
            sshUsername: clientRow["Website SSH Username"] || "",
            sshPassword: clientRow["Website SSH Password"] || "",
            notes: clientRow["Website Notes"] || "",
          },
          additionalServices,
        }

        // console.log(
        //   "Prepared client data structure:",
        //   JSON.stringify(
        //     {
        //       clientName: clientData.clientName,
        //       clientCode: clientData.clientCode,
        //       contactPerson: clientData.contactPerson,
        //       contactEmail: clientData.contactEmail,
        //       domain: {
        //         name: clientData.domain.name,
        //         purchasePlatform: clientData.domain.purchasePlatform,
        //         expiryDate: clientData.domain.expiryDate,
        //       },
        //       website: {
        //         technology: clientData.website.technology,
        //         hostingProvider: clientData.website.hostingProvider,
        //         serverType: clientData.website.serverType,
        //       },
        //       googleWorkspace: googleWorkspace
        //         ? {
        //             accountName: clientData.googleWorkspace.accountName,
        //             adminEmail: clientData.googleWorkspace.adminEmail,
        //             monthlyFee: clientData.googleWorkspace.monthlyFee,
        //             renewalDate: clientData.googleWorkspace.renewalDate,
        //           }
        //         : null,
        //       emailAccountsCount: emailAccounts.length,
        //       additionalServicesCount: additionalServices.length,
        //     },
        //     null,
        //     2,
        //   ),
        // )

        // Validate only required fields: Client Name* and Domain Name*
        if (!clientData.clientName || !clientData.domain.name) {
          // console.log(`Validation failed for client ${clientName}: Missing Client Name or Domain Name`)
          throw new Error("Missing required fields: Client Name or Domain Name")
        }

        // Create client in database
        // console.log(`Inserting client ${clientName} into database...`)
        const newClient = await ClientInfo.create(clientData)
        // console.log(`Successfully inserted client with ID: ${newClient._id}`)
        results.successful++
        // console.log(`Current progress: ${results.successful} successful, ${results.failed} failed`)
      } catch (error: any) {
        results.failed++
        // console.error(`Error processing row ${i + 2}:`, error.message)
        results.errors.push({
          row: i + 2, // +2 because of 0-indexing and header row
          message: error.message || "Unknown error",
        })
      }
    }

    // console.log("\n--- FINAL RESULTS ---")
    // console.log(`Total clients processed: ${results.total}`)
    // console.log(`Successfully imported: ${results.successful}`)
    // console.log(`Failed imports: ${results.failed}`)
    // console.log("Errors:", results.errors)

    return NextResponse.json(
      {
        message: `Processed ${results.total} clients: ${results.successful} successful, ${results.failed} failed`,
        details: results,
      },
      { status: 200 },
    )
  } catch (error: any) {
    // console.error("Error processing bulk upload:", error)
    return NextResponse.json({ message: error.message || "Failed to process file" }, { status: 500 })
  }
}
