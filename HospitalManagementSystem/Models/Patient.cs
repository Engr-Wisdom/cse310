namespace HospitalManagementSystem.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Gender { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public Patient(
            int id,
            string name,
            int age,
            string gender,
            string phoneNumber,
            string address)
        {
            Id = id;
            Name = name;
            Age = age;
            Gender = gender;
            PhoneNumber = phoneNumber;
            Address = address;
        }

        public void DisplayPatient()
        {
            Console.WriteLine("\n========== PATIENT DETAILS ==========");
            Console.WriteLine($"Patient ID: {Id}");
            Console.WriteLine($"Name: {Name}");
            Console.WriteLine($"Age: {Age}");
            Console.WriteLine($"Gender: {Gender}");
            Console.WriteLine($"Phone Number: {PhoneNumber}");
            Console.WriteLine($"Address: {Address}");
            Console.WriteLine("=====================================");
        }
    }
}