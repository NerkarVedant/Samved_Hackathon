import { medicalRecords } from "../data/medicalRecords";
import AppLayout from "../layouts/AppLayout";

export default function Records() {
  return (
    <AppLayout>
      <h1 className="font-heading text-xl font-semibold mb-2">
        Medical Records
      </h1>

      <p className="text-textSecondary mb-6">
        View your past diagnoses and prescribed medications
      </p>

      <div className="space-y-4">
        {medicalRecords.map((record) => (
          <div
            key={record.recordId}
            className="bg-surface border border-border rounded-md p-5"
          >
            {/* Diagnosis Info */}
            <div className="mb-3">
              <h2 className="font-heading font-semibold text-lg">
                {record.condition.name}
              </h2>
              <p className="text-sm text-textSecondary">
                ICD Code: {record.condition.icdCode}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <p>
                <span className="font-medium">Diagnosis Date:</span>{" "}
                {record.diagnosisDate}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {record.status}
              </p>
              <p>
                <span className="font-medium">Severity:</span>{" "}
                {record.severity}
              </p>
              <p>
                <span className="font-medium">Doctor:</span>{" "}
                {record.doctor}
              </p>
            </div>

            <p className="text-sm text-textSecondary mb-4">
              {record.notes}
            </p>

            {/* Medications */}
            <div>
              <h3 className="font-heading font-medium mb-2">
                Medications
              </h3>

              <div className="space-y-2">
                {record.medications.map((med) => (
                  <div
                    key={med.medicationId}
                    className="border border-border rounded-md p-3 text-sm"
                  >
                    <p className="font-medium">{med.drugName}</p>
                    <p className="text-textSecondary">
                      {med.dosage} · {med.frequency} · {med.timing}
                    </p>
                    <p className="text-textDisabled">
                      From {med.startDate}{" "}
                      {med.endDate ? `to ${med.endDate}` : "(Ongoing)"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
