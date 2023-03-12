import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("This feild is required")
    .min(3, "Name must be 3 character"),
  batch: yup.string().required("This feild is required"),
  section: yup.string().required("This feild is required"),
  category: yup.string().required("This feild is required"),
  type: yup.string().required("This feild is required"),
  createdBy: yup.string().required("This feild is required"),
  week: yup.string().required("This feild is required"),
  day: yup.string().required("This feild is required"),
  zoomLink: yup
    .string()
    .matches(
      /^https?:\/\/[a-z\d]+\.zoom\.us\/j\/\d{9,}$/,
  'Please enter a valid Zoom meeting link'
    )
    .required("Zoom meeting link is required"),
  schedule: yup
    .date()
    .required("Please select a date and time.")
    .min(
      new Date(),
      "Selected date and time cannot be before current date and time."
    ),
  concludes: yup
    .date()
    .required("Please select a date and time.")
    .min(
      yup.ref("schedule"),
      "Selected date and time cannot be earlier than scheduled date and time."
    ),
});
export default validationSchema;
