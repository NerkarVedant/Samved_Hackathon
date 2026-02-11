import AppLayout from "../layouts/AppLayout";
import NotificationItem from "../components/NotificationItem";
import { medicalRecords } from "../data/medicalRecords";

export default function Dashboard() {
  return (
    <AppLayout>
      <h2 className="font-heading text-lg font-semibold mb-4">
        Dashboard Overview
      </h2>

      {/* Tile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Notifications Tile */}
        <section className="bg-bg border border-border rounded-md p-4 flex flex-col">
          <h3 className="font-heading font-medium mb-3">
            Notifications
          </h3>

          <div className="space-y-2 overflow-y-auto max-h-60 pr-1">
            <NotificationItem
              title="Upcoming Appointment"
              message="Visit scheduled at PHC on 12 Feb 2026"
              date="2 days ago"
            />
            <NotificationItem
              title="Medication Reminder"
              message="Metformin refill due in 3 days"
              date="Today"
            />
            <NotificationItem
              title="Health Advisory"
              message="Annual blood sugar screening recommended"
              date="Yesterday"
            />
          </div>
        </section>

        {/* Health Prediction Tile */}
        <section className="bg-bg border border-border rounded-md p-4">
          <h3 className="font-heading font-medium mb-3">
            Health Risk Prediction
          </h3>

          <p className="text-sm text-textSecondary mb-3">
            Based on your past medical records, you may be at risk for:
          </p>

          <ul className="text-sm space-y-2">
            <li className="flex justify-between">
              <span>Hypertension progression</span>
              <span className="font-medium text-primary">Medium</span>
            </li>
            <li className="flex justify-between">
              <span>Diabetic complications</span>
              <span className="font-medium text-primary">Low</span>
            </li>
            <li className="flex justify-between">
              <span>Cardiac risk (5 yrs)</span>
              <span className="font-medium text-primary">Low</span>
            </li>
          </ul>

          <p className="text-xs text-textDisabled mt-4">
            * Predictions are informational only.
          </p>
        </section>

        {/* Medical Summary Tile */}
        <section className="bg-bg border border-border rounded-md p-4">
          <h3 className="font-heading font-medium mb-3">
            Medical Summary
          </h3>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Active Conditions:</span>{" "}
              {
                medicalRecords.filter(r => r.status !== "resolved").length
              }
            </p>
            <p>
              <span className="font-medium">Ongoing Medications:</span>{" "}
              {
                medicalRecords.flatMap(r => r.medications).filter(m => !m.endDate).length
              }
            </p>
            <p>
              <span className="font-medium">Last Diagnosis:</span>{" "}
              {medicalRecords[medicalRecords.length - 1].diagnosisDate}
            </p>
          </div>
        </section>

        {/* Quick Actions Tile */}
        <section className="bg-bg border border-border rounded-md p-4 lg:col-span-2">
          <h3 className="font-heading font-medium mb-3">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <button className="border border-border rounded-sm p-3 text-left hover:bg-surface">
              View Medical Records
            </button>
            <button className="border border-border rounded-sm p-3 text-left hover:bg-surface">
              Download Prescriptions
            </button>
            <button className="border border-border rounded-sm p-3 text-left hover:bg-surface">
              Book Appointment
            </button>
            <button className="border border-border rounded-sm p-3 text-left hover:bg-surface">
              Update Profile
            </button>
          </div>
        </section>

      </div>
    </AppLayout>
  );
}
