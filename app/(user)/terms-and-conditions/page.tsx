import { Metadata } from "next";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Terms & Conditions | Brighten Solutions",
  description:
    "Read our terms and conditions for using our website and services. Learn about our policies regarding web development, digital marketing, and client agreements.",
};

export default function TermsPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:mb-16">
        <SectionTitle
          badge="Legal Information"
          title=""
          highlight=""
          subtitle="Please read these terms and conditions carefully before using our services"
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to Brighten Solutions. By accessing our website or engaging our services, you agree to be bound by these Terms & Conditions. 
                If you do not agree with any part of these terms, please do not use our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Our Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Brighten Solutions provides web design & development, digital marketing, SEO, UI/UX design, branding, and related services.
                The specific scope, deliverables, timeline, and fees for each engagement are defined in a separate proposal or statement of work agreed upon by both parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Client Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As our client, you agree to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 space-y-1">
                <li>Provide all necessary content (text, images, logos, videos) within agreed timelines.</li>
                <li>Ensure all supplied materials are owned by you or properly licensed for use.</li>
                <li>Designate a single point of contact for project communications.</li>
                <li>Review deliverables and provide feedback within the agreed timeframe.</li>
                <li>We are not liable for copyright infringement resulting from client-supplied content.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Payment Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                A non-refundable deposit (typically 50% of the total project cost) is required before any work begins. 
                The remaining balance is due upon project completion or according to the milestone schedule outlined in the proposal. 
                Invoices are payable within 14 days of issue. Late payments may incur a fee of 1.5% per month on the outstanding balance. 
                We reserve the right to pause or suspend work on any project with overdue payments.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ownership of final deliverables transfers to you once full payment is received. Until then, we retain ownership of all work not paid in full. 
                We grant you a non-exclusive, single-domain license to use project files upon payment. 
                Redistribution, resale, or reuse of design or code requires prior written consent. 
                We retain the right to display completed work in our portfolio and marketing materials unless you expressly request otherwise.
                Third-party assets (stock images, fonts, plugins) are subject to their own licence terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Revisions and Scope
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Each project includes the number of revision rounds specified in the proposal. 
                Additional revisions or changes outside the original scope will be quoted separately and require written approval before work proceeds.
                You are typically allowed up to two major revisions per deliverable; further changes may incur extra charges.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Cancellation & Refunds
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you cancel the project for any reason, the deposit is strictly non-refundable. 
                If cancellation occurs after work has commenced, you will also be liable for all time spent and costs incurred up to the cancellation date, payable immediately. 
                No refunds will be issued for completed or partially completed work once development has begun.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our total liability for any claim arising from or related to our services is limited to the total fees paid by you for the specific engagement in question.
                We are not liable for indirect, incidental, or consequential damages, including lost profits, data loss, or business interruption.
                We make no guarantees on search engine rankings or specific results from SEO or marketing efforts.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Warranties
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We warrant that our services will be performed with reasonable skill and care. 
                We do not guarantee specific results, rankings, traffic, or revenue outcomes. 
                Websites and digital products are delivered "as is" after final client approval.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. Hosting and Maintenance
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Unless a separate maintenance agreement is in place, we are not responsible for website hosting, uptime, security updates, or ongoing maintenance after project handoff.
                We offer maintenance plans as a separate service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                11. Confidentiality
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. 
                This obligation survives the termination of the agreement. Confidential information does not include information that is publicly available or independently developed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                12. Force Majeure
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Neither party is liable for delays or failures to perform resulting from causes beyond reasonable control, including acts of God, natural disasters, war, terrorism, or internet failures.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                13. Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms are governed by the laws of India. Any dispute should first be addressed in writing and resolved in good faith. 
                If unresolved, the courts in Surat, Gujarat, shall have exclusive jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                14. Updates to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may change these Terms from time to time. Continued use of our services after changes constitutes acceptance of updated terms. 
                Please review this page periodically for any changes.
              </p>
            </div>

            <div className="border-t pt-6 mt-8">
              <p className="text-gray-500 text-sm">
                For questions about these Terms & Conditions, please contact us at{" "}
                <a href="mailto:brightensolutions@gmail.com" className="text-blue-600 hover:underline">
                  brightensolutions@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}