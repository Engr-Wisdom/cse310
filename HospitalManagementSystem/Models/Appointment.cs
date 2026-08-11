namespace HospitalManagementSystem.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public DateTime AppointmentDate { get; set; }

        public string Reason { get; set; }

        public Appointment(
            int id,
            int patientId,
            int doctorId,
            DateTime appointmentDate,
            string reason)
        {
            Id = id;
            PatientId = patientId;
            DoctorId = doctorId;
            AppointmentDate = appointmentDate;
            Reason = reason;
        }

        public void DisplayAppointment()
        {
            Console.WriteLine("\n========== APPOINTMENT DETAILS ==========");
            Console.WriteLine($"Appointment ID: {Id}");
            Console.WriteLine($"Patient ID: {PatientId}");
            Console.WriteLine($"Doctor ID: {DoctorId}");
            Console.WriteLine($"Appointment Date: {AppointmentDate:yyyy-MM-dd}");
            Console.WriteLine($"Reason: {Reason}");
            Console.WriteLine("=========================================");
        }
    }
}