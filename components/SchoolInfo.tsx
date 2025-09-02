import type React from 'react';

interface School {
  name: string;
  type: 'Elementary' | 'Middle' | 'High' | 'Charter';
  rating: number;
  grades: string;
  distance: string;
}

interface SchoolInfoProps {
  neighborhood?: string;
}

const schoolsData: { [key: string]: School[] } = {
  'Centennial Hills': [
    { name: 'Centennial High School', type: 'High', rating: 9, grades: '9-12', distance: '0.5 mi' },
    {
      name: 'Walter Johnson Middle School',
      type: 'Middle',
      rating: 8,
      grades: '6-8',
      distance: '0.3 mi',
    },
    {
      name: 'Centennial Hills Elementary',
      type: 'Elementary',
      rating: 9,
      grades: 'K-5',
      distance: '0.2 mi',
    },
    {
      name: 'Coral Academy of Science',
      type: 'Charter',
      rating: 9,
      grades: 'K-12',
      distance: '1.2 mi',
    },
  ],
  Providence: [
    { name: 'Palo Verde High School', type: 'High', rating: 8, grades: '9-12', distance: '1.1 mi' },
    { name: 'Rogich Middle School', type: 'Middle', rating: 8, grades: '6-8', distance: '0.8 mi' },
    {
      name: 'Providence Elementary',
      type: 'Elementary',
      rating: 8,
      grades: 'K-5',
      distance: '0.4 mi',
    },
  ],
  'Skye Canyon': [
    {
      name: 'Shadow Ridge High School',
      type: 'High',
      rating: 8,
      grades: '9-12',
      distance: '0.7 mi',
    },
    { name: 'Brinley Middle School', type: 'Middle', rating: 7, grades: '6-8', distance: '0.5 mi' },
    {
      name: 'Skye Canyon Elementary',
      type: 'Elementary',
      rating: 8,
      grades: 'K-5',
      distance: '0.3 mi',
    },
  ],
  'The Trails': [
    { name: 'Palo Verde High School', type: 'High', rating: 8, grades: '9-12', distance: '1.5 mi' },
    {
      name: 'Dell H. Robison Middle School',
      type: 'Middle',
      rating: 8,
      grades: '6-8',
      distance: '1.2 mi',
    },
    {
      name: 'The Trails Elementary',
      type: 'Elementary',
      rating: 9,
      grades: 'K-5',
      distance: '0.6 mi',
    },
  ],
  'Tournament Hills': [
    {
      name: 'Shadow Ridge High School',
      type: 'High',
      rating: 8,
      grades: '9-12',
      distance: '1.8 mi',
    },
    { name: 'Brinley Middle School', type: 'Middle', rating: 7, grades: '6-8', distance: '1.4 mi' },
    {
      name: 'Tournament Hills Elementary',
      type: 'Elementary',
      rating: 8,
      grades: 'K-5',
      distance: '0.5 mi',
    },
  ],
};

const SchoolInfo: React.FC<SchoolInfoProps> = ({ neighborhood = 'Centennial Hills' }) => {
  const schools = schoolsData[neighborhood] || schoolsData['Centennial Hills'];

  const getStarRating = (rating: number) => {
    const floorRating = Math.floor(Math.max(0, Math.min(10, rating)));
    const emptyStars = Math.max(0, 10 - floorRating);
    return '★'.repeat(floorRating) + '☆'.repeat(emptyStars);
  };

  return (
    <div className="school-info">
      <h3>Schools Near {neighborhood}</h3>
      <div className="schools-grid">
        {schools.map((school, index) => (
          <div key={index} className="school-card">
            <div className="school-header">
              <h4 className="school-name">{school.name}</h4>
              <span className={`school-type ${school.type.toLowerCase()}`}>{school.type}</span>
            </div>
            <div className="school-details">
              <div className="school-rating">
                <span
                  className={`rating-number rating-${school.rating >= 9 ? 'excellent' : school.rating >= 7 ? 'good' : 'poor'}`}
                >
                  {school.rating}/10
                </span>
                <div className="rating-stars">{getStarRating(school.rating)}</div>
              </div>
              <div className="school-info-row">
                <span className="grades">Grades: {school.grades}</span>
                <span className="distance">{school.distance} away</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="school-disclaimer">
        <p>
          <small>
            School ratings and distances are approximate. Please verify with Clark County School
            District for current information.
          </small>
        </p>
      </div>
    </div>
  );
};

export default SchoolInfo;
