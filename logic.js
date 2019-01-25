/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.ehr.hackathon.CreateMedicalRecord} recordData The sample transaction instance.
 * @transaction
 */

async function CreateMedicalRecord(recordData){

    
 
  
  await updatePatientRecords(recordData);
  
  return getAssetRegistry('org.ehr.hackathon.MedicalRecord')
      .then(function(medicalRecordsList){
          var factory = getFactory();
          var recordId = recordData.doctor.firstName + '_' + recordData.patient.firstName + '_' + new Date().toLocaleDateString() + '_' + new Date().toLocaleTimeString();
          var medicalRecord = factory.newResource('org.ehr.hackathon', 'MedicalRecord', recordId);
          medicalRecord.patient = recordData.patient;
            medicalRecord.doctor = recordData.doctor;
        return medicalRecordsList.add(medicalRecord);
    });
}

async function updatePatientRecords(recordData){
            return getParticipantRegistry('org.ehr.hackathon.Patient')
            .then(function(patientRegistry) {
                  console.log("OK");
                  return patientRegistry.get(recordData.patient.patientId).then(function(patient){
                    console.log("BBB");
                      if(patient.myRecord==null){
                        patient.myRecord = [];
                      }
                      patient.myRecord.push(String(recordData));
                    //patient.myRecord = 88; 
                    return patientRegistry.update(patient);
                })
            })
    }




