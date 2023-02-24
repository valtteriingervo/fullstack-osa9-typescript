import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { Patient } from "../types"
import patientService from "../services/patients"


const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient>();
  let id = useParams().id

  useEffect(() => {
    const fetchPatientByID = async (id: string) => {
      const patient = await patientService.getByID(id);
      setPatient(patient);
    };
    if (id) {
      void fetchPatientByID(id);
    }
  }, [id]);


  if (patient) {
    return (
      <>
        <p><b>{patient.name}</b></p>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>SSN: {patient.ssn}</p>
      </>
    )
  }
  // If the ID is not defined, or patient is not found with the given ID
  // return the following message
  else {
    return (
      <>
        <p>Couldn't find a patient with the id: {id}</p>
      </>
    )
  }

}

export default SinglePatient;