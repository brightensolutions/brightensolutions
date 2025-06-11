import { NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function GET() {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Create the main client info sheet
    const clientInfoData = [
      // Headers with required fields marked with *
      [
        "Client Name*",
        "Client Code",
        "Contact Person",
        "Contact Email",
        "Contact Phone",
        "Notes",
        "Domain Name*",
        "Domain Purchase Platform*",
        "Domain Login URL*",
        "Domain Username*",
        "Domain Password*",
        "Domain Expiry Date* (YYYY-MM-DD)",
        "Domain Auto Renewal (TRUE/FALSE)",
        "Domain Registrar",
        "Domain Notes",
        "Website Technology*",
        "Website Framework",
        "Website Hosting Provider*",
        "Website Server Type",
        "Website Server URL*",
        "Website cPanel URL",
        "Website Username*",
        "Website Password*",
        "Website Database Name",
        "Website Database Username",
        "Website Database Password",
        "Website SSH Access (TRUE/FALSE)",
        "Website SSH Username",
        "Website SSH Password",
        "Website Notes",
      ],
      // Example row
      [
        "Example Client",
        "EXC001",
        "John Doe",
        "john@example.com",
        "123-456-7890",
        "Example client notes",
        "example.com",
        "GoDaddy",
        "https://godaddy.com/login",
        "username",
        "password123",
        "2025-12-31",
        "TRUE",
        "GoDaddy",
        "Domain purchased in 2020",
        "WordPress",
        "N/A",
        "DigitalOcean",
        "VPS",
        "https://server.example.com",
        "https://cpanel.example.com",
        "admin",
        "serverpass123",
        "exampledb",
        "dbuser",
        "dbpass123",
        "TRUE",
        "sshuser",
        "sshpass123",
        "Website launched in 2021",
      ],
      // Empty row for user to fill
      [],
    ]

    // Create the Google Workspace sheet
    const googleWorkspaceData = [
      // Headers
      [
        "Client Name*",
        "Account Name",
        "Admin Email",
        "Admin Password",
        "Login URL",
        "Subscription Type",
        "Monthly Fee",
        "Renewal Date (YYYY-MM-DD)",
        "Notes",
      ],
      // Example row
      [
        "Example Client",
        "Example Workspace",
        "admin@example.com",
        "adminpass123",
        "https://admin.google.com",
        "Business Standard",
        "12.00",
        "2024-06-30",
        "5 user accounts",
      ],
      // Empty row for user to fill
      [],
    ]

    // Create the Email Accounts sheet
    const emailAccountsData = [
      // Headers
      ["Client Name*", "Email Address", "Password", "Login URL", "Notes"],
      // Example rows
      ["Example Client", "user1@example.com", "userpass123", "https://mail.google.com", "CEO account"],
      ["Example Client", "user2@example.com", "userpass456", "https://mail.google.com", "Marketing account"],
      // Empty row for user to fill
      [],
    ]

    // Create the Additional Services sheet
    const additionalServicesData = [
      // Headers
      [
        "Client Name*",
        "Service Name",
        "Service Type",
        "Login URL",
        "Username",
        "Password",
        "Expiry Date (YYYY-MM-DD)",
        "Notes",
      ],
      // Example rows
      [
        "Example Client",
        "Google Analytics",
        "Analytics",
        "https://analytics.google.com",
        "analytics@example.com",
        "analyticspass123",
        "2024-12-31",
        "UA-12345678",
      ],
      [
        "Example Client",
        "Cloudflare",
        "CDN",
        "https://cloudflare.com/login",
        "cf@example.com",
        "cfpass123",
        "2024-12-31",
        "Free plan",
      ],
      // Empty row for user to fill
      [],
    ]

    // Add sheets to workbook
    const clientInfoSheet = XLSX.utils.aoa_to_sheet(clientInfoData)
    const googleWorkspaceSheet = XLSX.utils.aoa_to_sheet(googleWorkspaceData)
    const emailAccountsSheet = XLSX.utils.aoa_to_sheet(emailAccountsData)
    const additionalServicesSheet = XLSX.utils.aoa_to_sheet(additionalServicesData)

    XLSX.utils.book_append_sheet(workbook, clientInfoSheet, "Client Information")
    XLSX.utils.book_append_sheet(workbook, googleWorkspaceSheet, "Google Workspace")
    XLSX.utils.book_append_sheet(workbook, emailAccountsSheet, "Email Accounts")
    XLSX.utils.book_append_sheet(workbook, additionalServicesSheet, "Additional Services")

    // Add instructions sheet
    const instructionsData = [
      ["Client Information Template - Instructions"],
      [""],
      ["1. Do not modify the column headers or sheet structure"],
      ["2. Required fields are marked with an asterisk (*)"],
      ["3. Dates should be in YYYY-MM-DD format"],
      ["4. Boolean values should be TRUE or FALSE"],
      ["5. For multiple email accounts or services, use additional rows with the same client name"],
      ["6. Each client should have one row in the Client Information sheet"],
      ["7. The Google Workspace sheet is optional but requires the client name to match"],
      ["8. Email accounts and additional services are linked to clients by the client name"],
      [""],
      ["For support, contact your system administrator"],
    ]

    const instructionsSheet = XLSX.utils.aoa_to_sheet(instructionsData)
    XLSX.utils.book_append_sheet(workbook, instructionsSheet, "Instructions")

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    // Return the Excel file
    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="client-info-template.xlsx"',
      },
    })
  } catch (error) {
    console.error("Error generating template:", error)
    return NextResponse.json({ message: "Failed to generate template" }, { status: 500 })
  }
}
