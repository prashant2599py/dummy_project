import React, { useState, useEffect } from 'react';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import GlobalApi from '@/app/_services/GlobalApi';

function AddNewStudent({ refreshData }) {
  const [open, setOpen] = useState(false);
  const [batch, setBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const resp = await GlobalApi.GetAllBatch();
        setBatch(resp?.data || []);
      } catch (error) {
        console.error("Error fetching batches:", error);
        setBatch([]); // Fallback to empty array
      }
    };
    
    fetchBatches();
  }, []);

  const closeDialog = () => {
    reset();
    setOpen(false);
  };

 const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await GlobalApi.CreateNewStudent(data);
      // console.log(resp.json());
      if (resp.data) {
        reset();
        setOpen(false);
        toast.success('New Student Added!');
        refreshData();
      }
    } catch (error) {
      // console.error("Failed to add new student:", error);  // Log the entire error object
      const errorMessage = error?.response?.data?.message || error?.message || "Error adding student.";
      toast.error(errorMessage); // Use the error message from response or fallback to general message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: '#6366f1',
          color: '#fff',
          borderRadius: '8px',
          padding: '8px 16px',
        }}
      >
        + Add New Student
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className='py-2'>
                   <label htmlFor="name">Full Name</label>
                  <Input
                    id="name"
                    placeholder='Ex. Arnav'
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className='py-2'>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder='Ex. arnav@example.com'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
                </div>

                {/* Enrollment ID */}
                <div className='py-2'>
                  <label htmlFor="id">Enrollment</label>
                  <Input
                    id="id"
                    type="number"
                    placeholder='Ex. 9922103215'
                    {...register('id', {
                      required: 'Enrollment is required',
                      min: { value: 100, message: 'Invalid enrollment number' },
                      max: { value: 999, message: 'Invalid enrollment number' },
                    })}
                  />
                  {errors.id && <span style={{ color: 'red', fontSize: '12px' }}>{errors.id.message}</span>}
                </div>

                {/* Batch Selection */}
                <div className='py-2'>
                  <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Batch</label>
                  <select
                    id="batch"
                    className='p-3 border rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm text-gray-900 placeholder-gray-400'
                    {...register('batch', { required: 'Batch is required' })}
                  >
                    <option value="" disabled selected className="text-gray-500">Select Batch</option>
                    {['1', '2', '3'].map((item, index) => (
                      <option key={index} value={item} className="text-gray-900">
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.batch && (
                    <span className="text-sm text-red-500">{errors.batch.message}</span>
                  )}
                </div>

                {/* Buttons */}
                <div className='flex gap-3 items-center justify-end mt-5'>
                  <Button type="button" onClick={closeDialog} style={{ backgroundColor: '#e5e7eb', color: '#1f2937' }}>Cancel</Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: loading ? '#94a3b8' : '#6366f1',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      opacity: loading ? 0.8 : 1,
                    }}
                  >
                    {loading ? 'Loading...' : 'Save'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
