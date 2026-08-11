namespace HospitalManagementSystem.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Specialty { get; set; }

        public string PhoneNumber { get; set; }

        public Doctor(
            int id,
            string name,
            string specialty,
            string phoneNumber)
        {
            Id = id;
            Name = name;
            Specialty = specialty;
            PhoneNumber = phoneNumber;
        }

        public void DisplayDoctor()
        {
            Console.WriteLine("\n========== DOCTOR DETAILS ==========");
            Console.WriteLine($"Doctor ID: {Id}");
            Console.WriteLine($"Name: {Name}");
            Console.WriteLine($"Specialty: {Specialty}");
            Console.WriteLine($"Phone Number: {PhoneNumber}");
            Console.WriteLine("====================================");
        }
    }
}