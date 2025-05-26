
interface School {
  name: string;
  type: string;
  rating: string;
  address: string;
  grades: string;
}

const schools: School[] = [
  {
    name: "Centennial High School",
    type: "Public High School",
    rating: "9/10",
    address: "10200 Centennial Pkwy",
    grades: "9-12"
  },
  {
    name: "Palo Verde High School", 
    type: "Public High School",
    rating: "8/10",
    address: "333 Pavilion Center Dr",
    grades: "9-12"
  },
  {
    name: "Shadow Ridge High School",
    type: "Public High School", 
    rating: "8/10",
    address: "9050 W Elkhorn Rd",
    grades: "9-12"
  },
  {
    name: "Coral Academy Charter",
    type: "Charter School",
    rating: "9/10",
    address: "Multiple Locations",
    grades: "K-12"
  }
];

export default function SchoolInfo() {
  return (
    <div className="school-info-section">
      <h3>🏫 Top-Rated Schools in Centennial Hills</h3>
      <div className="schools-grid">
        {schools.map((school, index) => (
          <div key={index} className="school-card">
            <h4>{school.name}</h4>
            <div className="school-details">
              <span className="school-type">{school.type}</span>
              <span className="school-rating">⭐ {school.rating}</span>
            </div>
            <p className="school-grades">Grades: {school.grades}</p>
            <p className="school-address">{school.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
