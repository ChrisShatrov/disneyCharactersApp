import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { formatDate } from '../utils/formatDate';
import { useSearchParams } from 'react-router-dom';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
  favoriteCharacter: string;
  favoriteRide: string;
  favoriteMovie: string;
  favoritePark: string;
  birthday: Date | null;
  updatedAt: Date;
}

const initialProfileData: ProfileFormValues = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  city: 'Los Angeles',
  state: 'CA',
  favoriteCharacter: 'Mickey Mouse',
  favoriteRide: 'Space Mountain',
  favoriteMovie: 'The Lion King',
  favoritePark: 'Disney World, Florida',
  birthday: new Date('1992-05-15'),
  updatedAt: new Date(),
};

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  age: Yup.number().min(0, 'Invalid age').required('Age is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  favoriteCharacter: Yup.string().required('Favorite character is required'),
  favoriteRide: Yup.string().required('Favorite ride is required'),
  favoriteMovie: Yup.string().required('Favorite movie is required'),
  favoritePark: Yup.string().required('Favorite park is required'),
  birthday: Yup.date().nullable().required('Birthday is required'),
});

const formFields = [
  {
    name: 'favoriteCharacter',
    label: 'Favorite Disney Character',
    type: 'text',
  },
  { name: 'favoriteRide', label: 'Favorite Disney Ride', type: 'text' },
  { name: 'favoriteMovie', label: 'Favorite Disney Movie', type: 'text' },
  { name: 'favoritePark', label: 'Favorite Disneyland Park', type: 'text' },
];

export const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [searchParams, setSearchParams] = useSearchParams();

  const isEditing = searchParams.get('edit') === 'true';
  const handleEditToggle = () => {
    setSearchParams(isEditing ? {} : { edit: 'true' });
  };

  const handleFormSubmit = (values: ProfileFormValues) => {
    setProfileData(values);
    setSearchParams({});
    console.log(values);
  };

  useEffect(() => {
    if (isEditing) {
      setSearchParams({ edit: 'true' });
    }
  }, [isEditing, setSearchParams]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ backgroundColor: '#F1F2F3', mt: 2, px: 8, py: 8 }}>
        {!isEditing ? (
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1">
                Last Updated {formatDate(profileData.updatedAt)}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6" fontWeight="bold">
                Age: {profileData.age}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Location: {profileData.city}, {profileData.state}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Birthday:{' '}
                {profileData.birthday && formatDate(profileData.birthday)}
              </Typography>
              {formFields.map((field) => {
                const value =
                  profileData[field.name as keyof ProfileFormValues];
                return (
                  <Typography key={field.name} variant="h6" fontWeight="bold">
                    {field.label}: {String(value ?? '')}
                  </Typography>
                );
              })}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditToggle}
              sx={{
                fontSize: '16px',
                py: '10px',
                px: '20px',
                mt: 6,
                backgroundColor: '#054553',
                color: '#F1F2F3',
                textTransform: 'none',
              }}
            >
              Edit Profile
            </Button>
          </Box>
        ) : (
          <Formik
            initialValues={profileData}
            validationSchema={ProfileSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched, setFieldValue, isValid, dirty }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', md: 'row' }}
                  gap={2}
                  mb={2}
                >
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    margin="normal"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ backgroundColor: '#ffffff' }}
                  />
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ backgroundColor: '#ffffff' }}
                  />
                </Box>

                <Box
                  mb={2}
                  sx={{
                    width: { xs: '100%', md: '50%' },
                    maxWidth: { xs: 'usnet', md: 'calc(50% - 8px)' },
                  }}
                >
                  <DatePicker
                    label="Birthday"
                    value={values.birthday}
                    onChange={(newValue) => setFieldValue('birthday', newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        error={touched.birthday && Boolean(errors.birthday)}
                        helperText={touched.birthday && errors.birthday}
                        sx={{ backgroundColor: '#ffffff' }}
                      />
                    )}
                  />
                </Box>

                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', md: 'row' }}
                  gap={2}
                  mb={2}
                >
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    margin="normal"
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    sx={{
                      backgroundColor: '#ffffff',
                      width: { xs: '100%', md: '50%' },
                    }}
                  />
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    select
                    margin="normal"
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                    sx={{
                      backgroundColor: '#ffffff',
                      width: { xs: '100%', md: '30%' },
                    }}
                  >
                    <MenuItem value="CA">California</MenuItem>
                    <MenuItem value="NY">New York</MenuItem>
                    <MenuItem value="TX">Texas</MenuItem>
                  </Field>
                </Box>

                {formFields
                  .filter((field) => field.name !== 'favoritePark')
                  .map((field) => (
                    <Box mb={2} key={field.name}>
                      <Field
                        as={TextField}
                        name={field.name}
                        label={field.label}
                        fullWidth
                        margin="normal"
                        error={
                          touched[field.name as keyof ProfileFormValues] &&
                          Boolean(errors[field.name as keyof ProfileFormValues])
                        }
                        helperText={
                          touched[field.name as keyof ProfileFormValues] &&
                          errors[field.name as keyof ProfileFormValues]
                        }
                        sx={{ backgroundColor: '#ffffff' }}
                      />
                    </Box>
                  ))}

                <Box mb={2} sx={{ width: { xs: '100%', md: '50%' } }}>
                  <Field
                    as={TextField}
                    name="favoritePark"
                    label="Favorite Disneyland Park"
                    select
                    fullWidth
                    margin="normal"
                    error={touched.favoritePark && Boolean(errors.favoritePark)}
                    helperText={touched.favoritePark && errors.favoritePark}
                    sx={{ backgroundColor: '#ffffff' }}
                  >
                    <MenuItem value="Disney World, Florida">
                      Disney World, Florida
                    </MenuItem>
                    <MenuItem value="Disneyland, California">
                      Disneyland, California
                    </MenuItem>
                    <MenuItem value="Tokyo Disneyland">
                      Tokyo Disneyland
                    </MenuItem>
                  </Field>
                </Box>

                <Box mt={3} display="flex" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid || !dirty}
                    sx={{
                      fontSize: '16px',
                      py: '10px',
                      px: '20px',
                      backgroundColor: '#054553',
                      color: '#F1F2F3',
                      textTransform: 'none',
                    }}
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleEditToggle}
                    sx={{
                      fontSize: '16px',
                      py: '10px',
                      px: '20px',
                      textTransform: 'none',
                      color: '#054553',
                      borderColor: '#054553',
                      '&:hover': {
                        borderColor: '#054553',
                        backgroundColor: 'rgba(5, 69, 83, 0.1)',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </LocalizationProvider>
  );
};
