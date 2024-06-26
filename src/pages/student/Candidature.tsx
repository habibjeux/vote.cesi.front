import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom'; 

import icone from "../../assets/icone_vote.png";
import ImageDeco from './components/ImageDeco';

function Candidature() {
  const { student } = useOutletContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); 
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:9090/roles');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    const candidateData = {
      ...data,
      student: {
        id: student.id,
        nce: student.nce,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      },
    };

    try {
      const response = await fetch('http://localhost:9090/cesi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(JSON.stringify(candidateData)); 
        throw new Error('Erreur soumission ' + (errorData.message || 'Unknown error'));
      }
  
      setSubmitSuccess("Votre candidature est soumise avec succès");
      setSubmitError(null);
      reset(); 
    } catch (error) {
      setSubmitError("Vous avez déjà postulé pour ce poste");
      setSubmitSuccess(null);
    }
  };

  return (
    <div className='flex'>
      <ImageDeco/>
      <div className="mx-auto flex flex-col justify-center items-center">
        <img className="w-24" src={icone} alt="icone vote" />
        <p className='text-green-600 text-xl font-bold my-2'>
          Veuillez remplir le formulaire pour candidater à un poste!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300 p-8 rounded-lg shadow-lg w-96">
          <div className="form-group flex flex-col mb-4">
            <label className="text-blue-600">Role</label>
            <select {...register('role.id', { required: 'Role is required' })} className="p-4 rounded-lg">
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.title}</option>
              ))}
            </select>
            {errors.role?.id && <span className="text-red-500">{errors.role.id.message}</span>}
          </div>
          <div className="form-group flex flex-col mb-4">
            <label className="text-blue-600">Photo URL</label>
            <input {...register('photoURL')} className="p-4 rounded-lg" />
          </div>
          <div className="form-group flex flex-col mb-4">
            <label className="text-blue-600">Program</label>
            <input {...register('program', { required: 'Program is required' })} className="p-4 rounded-lg" />
            {errors.program && <span className="text-red-500">{errors.program.message}</span>}
          </div>
          <div className="form-group flex flex-col mb-4">
            <button type="submit" className="bg-green-400 p-2 rounded-lg">Submit Candidate</button>
          </div>
          {submitError && <div className="text-red-500">{submitError}</div>}
          {submitSuccess && <div className="text-green-500">{submitSuccess}</div>}
        </form>
      </div>
    </div>
  );
}

export default Candidature;
