import React, { useState, useEffect } from "react";
import "./css/EventModal.css"; // Add styles for the modal

const EventModal = ({ isOpen, onClose, onSubmit, event }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: "",
    location: "",
    disaster: "",
    file: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [impacts, setImpacts] = useState(['HIGH', 'LOW', 'MEDIUM']);
  const [disasters, setDisasters] = useState([
    'EARTHQUAKE',
  'FLOOD',
  'LANDSLIDE',
  'TORNADO',
  'HURRICANE',
  'TSUNAMI',
  'WILDFIRE',
  'VOLCANIC_ERUPTION',
  'DROUGHT',
  'HEATWAVE',
  'SNOWSTORM',
  'AVALANCHE',
  'PANDEMIC',
  'CHEMICAL_SPILL',
  'NUCLEAR_ACCIDENT',
  'BUILDING_COLLAPSE',
  'TRANSPORT_ACCIDENT',
  'CYCLONE',
  'POWER_OUTAGE',
  'BIOLOGICAL_HAZARD',
  'WAR_OR_CONFLICT',
  'TERRORIST_ATTACK',
  'INDUSTRIAL_ACCIDENT',
  'OIL_SPILL',
  'FAMINE',
  'SINKHOLE',
  ]);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        impact: event.impact || "",
        location: event.location || "",
        disaster: event.disaster || "",
        file: event.image || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("description", formData.description);
    submissionData.append("impact", formData.impact);
    submissionData.append("location", formData.location);
    submissionData.append("disaster", formData.disaster);
    if (imageFile) {
      submissionData.append("file", imageFile);
    }
    onSubmit(submissionData);
  };

  return (
    isOpen && (
      <div className="song-modal-overlay">
        <div className="song-modal-content">
          <button className="song-close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>{event ? "Edit Event" : "Add Event"}</h2>
         
            <form className="song-form" onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
            </label>
            <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Impact:
                <select
                  name="impact"
                  value={formData.impact || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Impact Level</option>
                  {impacts.map((impact) => (
                    <option key={impact} value={impact}>
                      {impact}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Disaster:
                <select
                  name="disaster"
                  value={formData.disaster || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Disaster</option>
                  {disasters.map((disaster) => (
                    <option key={disaster} value={disaster}>
                      {disaster}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}
                {event && event.image && (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGE_BASE_URL}${event.image}`}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}
              </label>
              <button className="song-button" type="submit">
                {event ? "Update" : "Add"}
              </button>
            </form>
          
        </div>
      </div>
    )
  );
};

export default EventModal;
