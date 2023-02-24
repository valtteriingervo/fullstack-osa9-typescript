import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { Entry, Patient } from "../types"
import patientService from "../services/patients"


interface EntryProps {
  entry: Entry
}

const EntryComp = ({ entry }: EntryProps) => {
  if (entry.diagnosisCodes) {
    return (
      <>
        <p>{entry.date} {entry.description}</p>
        <ul>
          {entry.diagnosisCodes.map((code: string) =>
            // We can use 'code' as the key as it will be unique among this list
            // (There won't be two same diagnosis codes in the same entry)
            <li key={code}>{code}</li>
          )}
        </ul>
      </>
    )
  }

  // If there are no diagnosis codes, simply return date and description
  return (
    <>
      <p>{entry.date} {entry.description}</p>
    </>
  )

}

interface EntriesProps {
  entries: Entry[]
}

const EntriesList = ({ entries }: EntriesProps) => {
  // Don't render the entries portion if the patient has no entries
  if (entries.length === 0) {
    return null
  }

  return (
    <>
      <p><b>Entries:</b></p>
      <ul>
        {entries.map((entry: Entry) =>
          <EntryComp key={entry.id} entry={entry} />
        )}
      </ul>
    </>
  )
}


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
        <br></br>
        <EntriesList entries={patient.entries} />
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