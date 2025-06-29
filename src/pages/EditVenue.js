import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editVenue } from "../api/venues/editVenue";
import api from "../api/client";

const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await api.get(`/holidaze/venues/${id}`);
        setVenue(res.data.data); 
      } catch (err) {
        console.error("Failed to load venue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  if (loading) return <div className="container mt-5">Loading venue...</div>;
  if (!venue) return <div className="container mt-5 text-danger">Venue not found</div>;

const initialValues = {
  name: venue.name || "",
  description: venue.description || "",
  media: [venue.media?.[0]?.url || ""],
  price: venue.price || "",
  maxGuests: venue.maxGuests || "",
  wifi: venue.meta?.wifi || false,
  parking: venue.meta?.parking || false,
  breakfast: venue.meta?.breakfast || false,
  pets: venue.meta?.pets || false,
};

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    media: Yup.array().of(Yup.string().url("Invalid URL")),
    price: Yup.number().positive("Must be positive").required("Required"),
    maxGuests: Yup.number().min(1, "Must be at least 1").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
    const updatedVenue = {
  ...values,
  media: values.media
    .filter((url) => url !== "")
    .map((url) => ({ url, alt: values.name || "Venue image" })), 
  meta: {
    wifi: values.wifi,
    parking: values.parking,
    breakfast: values.breakfast,
    pets: values.pets,
  },
};

      await editVenue(id, updatedVenue);
      setSuccessMessage("Venue updated successfully!");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error("Error updating venue:", error);
      setErrorMessage("Failed to update venue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container bg-light p-5">
      <h2>Edit Venue</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
              <label>Media URL</label>
              <Field name="media[0]" className="form-control" />
              <ErrorMessage name="media[0]" component="div" className="text-danger" />
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

            <div className="mb-3">
              <label className="form-check">
                <Field type="checkbox" name="wifi" className="form-check-input" />
                Wi-Fi
              </label>
              <label className="form-check">
                <Field type="checkbox" name="parking" className="form-check-input" />
                Parking
              </label>
              <label className="form-check">
                <Field type="checkbox" name="breakfast" className="form-check-input" />
                Breakfast
              </label>
              <label className="form-check">
                <Field type="checkbox" name="pets" className="form-check-input" />
                Pets
              </label>
            </div>

            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditVenue;
