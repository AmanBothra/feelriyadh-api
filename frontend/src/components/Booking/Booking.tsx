import axios from 'axios';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';

import { Button, Input, NextImage } from '~/components/common';
import { useTranslation } from '~/i18n/TranslationProvider';
export const Booking = ({ data }: any) => {
  const { translate } = useTranslation();
  const [price, setPrice] = useState(null);
  const { query, push } = useRouter();
  const pricesList = data?.chalet_details;
  const bookedDates = data?.booked_dates;
  const bookedDatesArray = bookedDates?.map(
    (dateString) => new Date(dateString),
  );
  const newPrice = data?.new_price;
  const [success, setSuccess] = useState(false);

  const { id, locale } = query;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    setError,
    getValues,
    formState: { errors },
  } = useForm<any>();
  console.log(errors);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (obj) => {
    if (obj?.price) {
      const date = new Date(getValues('date'));
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const body = {
        ...obj,
        total_price: price,
        chalet: id,
        booking_date: formattedDate,
      };
      try {
        const { data } = await axios.post(`/api/chalet-booking`, body);
        if (data.success) {
          setSuccess(true);
          push(`/${locale}/book/${id}/success`);
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    } else {
      const message = translate('no price') as any;
      toast.error(message as any);
      setError('date', { message });

      return;
    }
  };

  const renderDayContents = (day, date) => {
    date.setHours(0, 0, 0, 0);

    const matchedPrice = pricesList?.find((detail) => {
      const startDate = new Date(detail.start_date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(detail.end_date);
      endDate.setHours(0, 0, 0, 0);

      return date >= startDate && date <= endDate;
    });

    const matchedNewPrice = newPrice?.find((detail) => {
      const newDate = new Date(detail.date);
      newDate.setHours(0, 0, 0, 0);

      return date.getTime() === newDate.getTime();
    });

    const isBooked = bookedDates && bookedDates.includes(formatDate(date));

    return (
      <div
        className={classNames(
          'block',
          isBooked && '!pointer-events-none !cursor-not-allowed',
        )}
        onClick={() => {
          if (!isBooked) {
            if (matchedNewPrice) {
              setPrice(matchedNewPrice.price);
              setValue('price', matchedNewPrice.price);
              clearErrors('price');
              clearErrors('date');
            } else if (matchedPrice) {
              setPrice(matchedPrice.price);
              setValue('price', matchedPrice.price);
              clearErrors('price');
              clearErrors('date');
            } else {
              const message = translate('no price') as any;
              toast.error(message);
              setValue('price', null);
              setValue('date', null);
              setError('date', { message });
            }
          }
        }}
      >
        <span
          className={classNames(
            isBooked && '!pointer-events-none !cursor-not-allowed line-through',
          )}
        >
          {day}
        </span>{' '}
        <br />
        <span
          className={classNames(
            'text-[10px] lg:text-sm ',
            isBooked && '!pointer-events-none !cursor-not-allowed line-through',
          )}
        >
          {matchedNewPrice
            ? `${Math.floor(parseFloat(matchedNewPrice.price))}`
            : matchedPrice
            ? `${Math.floor(parseFloat(matchedPrice.price))}`
            : '00.00'}
          <br />
          {translate('sar')}
        </span>
      </div>
    );
  };

  return (
    <section className='py-16 lg:py-32 relative overflow-hidden '>
      <div className='container'>
        {!success ? (
          <div className='w-full grid grid-cols-1 items-center justify-end gap-8 lg:grid-cols-2'>
            <div>
              <NextImage
                src={data?.chalet_image}
                alt='chalet'
                responsive
                priority
              />
            </div>
            <div className='flex flex-col  w-full lg:w-5/6 ml-auto rtl:mr-auto'>
              <div
                className='list-decimal items-start p-0 mb-8 list-inside text-lg'
                dangerouslySetInnerHTML={{
                  __html:
                    locale == 'en'
                      ? data?.terms_and_conditions_en
                      : data?.terms_and_conditions_ar,
                }}
              ></div>
              <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
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
                <div className=' mb-6'>
                  <Input
                    label={translate('birthday')}
                    name='birthday'
                    type='date'
                    required
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className='customDatePicker mb-6'>
                  <Controller
                    name={'date' as any}
                    control={control}
                    rules={{
                      required: translate('required field') as any,
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <DatePicker
                          selected={value}
                          value={value}
                          onChange={(date) => {
                            setValue('date', date);
                          }}
                          minDate={new Date()}
                          inline
                          renderDayContents={renderDayContents}
                          excludeDates={bookedDatesArray}
                        />
                        <p className='text-red-500 text-xs mt-1'>
                          {errors?.date?.message as any}
                        </p>
                      </>
                    )}
                  />
                </div>
                <div className='mb-6'>
                  <Input
                    label={translate('special request')}
                    name='special_request'
                    type='textarea'
                    register={register}
                    errors={errors}
                    maxLength={50}
                    minLength={3}
                  />
                </div>
                <Button type='submit' className='w-full mt-2'>
                  {translate('book')}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className='lg:py-16 py-8 text-black lg:max-w-2xl w-full mx-auto px-8 rounded-lg bg-white h-fit'>
            <div className='flex flex-col text-center w-full h-full justify-center lg:space-y-8 space-y-4'>
              <div className='text-primary uppercase font-medium relative z-10 flex flex-col text-5xl lg:!text-6xl leading-tight text-center'>
                <FaCheck className='w-12 mx-auto text-center mb-2 ' />
                <span>{translate('booking confirmed')}</span>
              </div>
              <div>
                <div className='text-lg'>{translate('booking message')}</div>
              </div>
              <Button
                onClick={() => push(`/${locale}`)}
                className='w-fit mx-auto'
              >
                {translate('back to home')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
