import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const CreateVenue = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const initialValues = {
    name: "",
    description: "",
    media: [""],
    price: "",
    maxGuests: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    media: Yup.array().of(Yup.string().url("Must be a valid URL")),
    price: Yup.number().positive("Must be positive").required(),
    maxGuests: Yup.number().min(1, "Must be at least 1").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const venueData = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        maxGuests: Number(values.maxGuests),
        media: values.media
          .filter((url) => url !== "")
          .map((url) => ({ url, alt: values.name })),
        location: {
          address: "Default address",
          city: "Oslo",
          zip: "0001",
          country: "Norway",
          continent: "Europe",
        },
        meta: {
          wifi: values.wifi,
          parking: values.parking,
          breakfast: values.breakfast,
          pets: values.pets,
        },
      };

      await api.post("/holidaze/venues", venueData);
      setSuccessMessage("Venue created successfully!");
      resetForm();
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error("Error creating venue:", error);
      setErrorMessage("Failed to create venue. Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container bg-light p-5">
      <h2>Create a New Venue</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="mb-3">
              <label>Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <Field name="description" as="textarea" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Media URLs</label>
              <FieldArray name="media">
                {({ push, remove }) => (
                  <>
                    {values.media.map((_, index) => (
                      <div className="d-flex mb-2 align-items-center" key={index}>
                        <Field
                          name={`media[${index}]`}
                          className="form-control me-2"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => remove(index)}
                          disabled={values.media.length === 1}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => push("")}
                    >
                      + Add another image
                    </button>
                  </>
                )}
              </FieldArray>
              <ErrorMessage name="media" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Price per night</label>
              <Field name="price" type="number" className="form-control" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Max Guests</label>
              <Field name="maxGuests" type="number" className="form-control" />
              <ErrorMessage name="maxGuests" component="div" className="text-danger" />
            </div>

            <div className="mb-3 form-check form-check-inline">
              <Field type="checkbox" name="wifi" className="form-check-input" id="wifi" />
              <label htmlFor="wifi" className="form-check-label">Wi-Fi</label>
            </div>

            <div className="mb-3 form-check form-check-inline">
              <Field type="checkbox" name="parking" className="form-check-input" id="parking" />
              <label htmlFor="parking" className="form-check-label">Parking</label>
            </div>

            <div className="mb-3 form-check form-check-inline">
              <Field type="checkbox" name="breakfast" className="form-check-input" id="breakfast" />
              <label htmlFor="breakfast" className="form-check-label">Breakfast</label>
            </div>

            <div className="mb-3 form-check form-check-inline">
              <Field type="checkbox" name="pets" className="form-check-input" id="pets" />
              <label htmlFor="pets" className="form-check-label">Pets</label>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Venue"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateVenue;
