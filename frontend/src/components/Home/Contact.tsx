import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { Button, Input } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';

interface FormData {
  username: string;
  phone: string;
  email: string;
}

export const Contact = () => {
  const { translate } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (obj) => {
    try {
      const { data } = await axios.post('/api/contact', obj);
      if (data?.success as any) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='py-16 lg:py-32 bg-lightPrimary'>
      <div className='container text-center'>
        <div className='font-medium'>
          <h2 className='lg:text-6xl text-4xl uppercase text-secondary'>
            {translate('get in touch')}
          </h2>
        </div>
        <div className='mx-auto w-full lg:max-w-xl flex flex-col gap-8 lg:mt-16 mt-8'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-6'>
              <Input
                label={translate('name')}
                name='name'
                required
                register={register}
                errors={errors}
                maxLength={50}
                minLength={3}
              />
            </div>
            <div className='mb-6'>
              <Input
                label={translate('phone number')}
                name='phone_number'
                type='tel'
                required
                register={register}
                errors={errors}
                maxLength={20}
                minLength={7}
              />
            </div>
            <div className='mb-6'>
              <Input
                label={translate('email address')}
                name='email'
                type='email'
                required
                register={register}
                errors={errors}
                maxLength={50}
                minLength={3}
              />
            </div>
            <Button type='submit' className='w-full mt-2'>
              {translate('send message')}
            </Button>
          </form>
          <div className='flex justify-center'>
            {isSuccess ? (
              <span className='text-green-600 text-lg font-medium uppercase flex items-center gap-2'>
                <FaCheck />
                {translate('form submit success')}
              </span>
            ) : null}
            {isError ? (
              <span className='text-red-600 text-lg font-medium uppercase flex items-center gap-2'>
                <FaTimes />
                {translate('form submit error')}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
