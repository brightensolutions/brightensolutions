import { Metadata } from "next";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Privacy Policy | Brighten Solutions",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal information when you use our website and services.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:mb-16">
        <SectionTitle
          badge="Privacy & Data Protection"
          title=""
          highlight=""
          subtitle="How we collect, use, and protect your personal information"
          titleClassName="text-gray-800"
          subtitleClassName="text-gray-600"
        />
        <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-500 italic">
                <strong>Last Updated:</strong> March 2026
              </p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Brighten Solutions, accessible from brightensolutions.com, one of our main priorities is the privacy of our visitors. 
                This Privacy Policy document contains types of information that is collected and recorded by Brighten Solutions and how we use it.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>Fill out a contact form or inquiry</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or proposal</li>
                <li>Engage our services</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                The personal information we may collect includes:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>Name and job title</li>
                <li>Contact information including email address and phone number</li>
                <li>Company name and website</li>
                <li>Billing information (processed securely via third-party payment providers)</li>
                <li>IP address and browser information (automatically collected)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>To respond to your inquiries and provide the services you request</li>
                <li>To process payments and complete transactions</li>
                <li>To send you important information about your account or project</li>
                <li>To send marketing communications (only with your consent)</li>
                <li>To improve our website, services, and customer experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Legal Basis for Processing (for UK/EEA visitors)
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you are from the UK or European Economic Area (EEA), our legal basis for collecting and using your personal information depends on the specific context in which we collect it. 
                We may process your data because:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>We have a contract with you (e.g., for service delivery)</li>
                <li>You have given us permission to do so (consent)</li>
                <li>The processing is in our legitimate interests and not overridden by your rights</li>
                <li>We need to comply with the law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Like most websites, we use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. 
                You can choose to disable cookies through your browser settings, but please note that some features of our website may not function properly as a result.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                The types of cookies we use include:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>
                  <strong>Essential cookies:</strong> Required for the website to function properly
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how visitors interact with our website
                </li>
                <li>
                  <strong>Preference cookies:</strong> Remember your settings and preferences
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our clients. 
                These parties are contractually obligated to keep your information confidential and use it only for the purposes for which we disclose it to them.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Third parties we may work with include:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>Payment processors (e.g., Stripe, PayPal)</li>
                <li>Email marketing platforms (e.g., Mailchimp, ConvertKit)</li>
                <li>Analytics providers (e.g., Google Analytics)</li>
                <li>Hosting and cloud service providers</li>
                <li>Project management tools</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. 
                We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Your Data Protection Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>
                  <strong>The right to access</strong> – You have the right to request copies of your personal data.
                </li>
                <li>
                  <strong>The right to rectification</strong> – You have the right to request that we correct any inaccurate information.
                </li>
                <li>
                  <strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.
                </li>
                <li>
                  <strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data.
                </li>
                <li>
                  <strong>The right to data portability</strong> – You have the right to request that we transfer your data to another organization.
                </li>
                <li>
                  <strong>The right to object</strong> – You have the right to object to our processing of your personal data.
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at the email provided below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. 
                By using our services, you consent to such transfers. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none pl-0 mt-3 text-gray-600 space-y-2">
                <li>
                  <strong>By email:</strong>{" "}
                  <a href="mailto:brightensolutions@gmail.com" className="text-blue-600 hover:underline">
                    brightensolutions@gmail.com
                  </a>
                </li>
                <li>
                  <strong>By phone:</strong>{" "}
                  <a href="tel:+917265993989" className="text-blue-600 hover:underline">
                    +91 7265993989
                  </a>
                </li>
                <li>
                  <strong>By mail:</strong> Brighten Solutions, Surat, Gujarat, India
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}