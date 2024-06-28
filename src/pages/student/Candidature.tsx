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
    const formData = new FormData();
    formData.append('student_id', student.id);
    formData.append('role_id', data.roleId);
    formData.append('program', data.program);
    formData.append('photo', data.photo[0]);

    try {
      const response = await fetch('http://localhost:9090/cesi/candidates', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
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
      <ImageDeco />
      <div className="mx-auto flex flex-col justify-center items-center">
        <img className="w-24" src={icone} alt="icone vote" />
        <p className='text-green-600 text-xl font-bold my-2'>
          Veuillez remplir le formulaire pour candidater à un poste!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300 p-8 rounded-lg shadow-lg w-96" encType="multipart/form-data">
          <div className="form-group flex flex-col mb-4">
            <label className="text-blue-600">Role</label>
            <select {...register('roleId', { required: 'Role is required' })} className="p-4 rounded-lg">
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.title}</option>
              ))}
            </select>
            {errors.roleId && <span className="text-red-500">{errors.roleId.message}</span>}
          </div>
          <div className="form-group flex flex-col mb-4">
            <label className="text-blue-600">Photo</label>
            <input type="file" {...register('photo', { required: 'Photo is required' })} className="p-4 rounded-lg" />
            {errors.photo && <span className="text-red-500">{errors.photo.message}</span>}
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
