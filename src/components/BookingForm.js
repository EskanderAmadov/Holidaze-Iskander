import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { fetchVenueBookings } from "../api/bookings/fetchVenueBookings";
import { createBooking } from "../api/bookings/createBooking";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const BookingForm = ({ venueId }) => {
  const { user } = useAuth();
  const [disabledDates, setDisabledDates] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadDates = async () => {
      try {
        const bookings = await fetchVenueBookings(venueId);

        const datesToDisable = bookings.flatMap((booking) => {
          const start = new Date(booking.dateFrom);
          const end = new Date(booking.dateTo);
          const dates = [];
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
          }
          return dates;
        });

        setDisabledDates(datesToDisable);
      } catch (error) {
        console.error("Failed to load booked dates", error);
      }
    };

    loadDates();
  }, [venueId]);

  const initialValues = {
    dateFrom: null,
    dateTo: null,
    guests: 1,
  };

  const validationSchema = Yup.object({
    dateFrom: Yup.date().required("Start date required"),
    dateTo: Yup.date()
      .required("End date required")
      .min(Yup.ref("dateFrom"), "End date must be after start date"),
    guests: Yup.number().min(1).required("Guests required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        venueId,
      };
      await createBooking(payload);
      setMessage({ type: "success", text: "Booking successful!" });
      resetForm();
    } catch (error) {
      console.error("Booking failed", error);
      setMessage({ type: "error", text: "Booking failed. Please try again." });
    }
  };

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="mb-3">Reserve Your Stay</h4>

      {message && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  <FaCalendarAlt className="me-2" />
                  From
                </label>
                <DatePicker
                  selected={values.dateFrom}
                  onChange={(date) => setFieldValue("dateFrom", date)}
                  excludeDates={disabledDates}
                  minDate={new Date()}
                  placeholderText="Select start date"
                  className="form-control"
                />
                <ErrorMessage name="dateFrom" component="div" className="text-danger small" />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <FaCalendarAlt className="me-2" />
                  To
                </label>
                <DatePicker
                  selected={values.dateTo}
                  onChange={(date) => setFieldValue("dateTo", date)}
                  excludeDates={disabledDates}
                  minDate={values.dateFrom || new Date()}
                  placeholderText="Select end date"
                  className="form-control"
                />
                <ErrorMessage name="dateTo" component="div" className="text-danger small" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Guests
              </label>
              <Field type="number" name="guests" className="form-control" min={1} />
              <ErrorMessage name="guests" component="div" className="text-danger small" />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Book Now
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
