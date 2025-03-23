import { Button, Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/courses/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setCourse(data.courses);
      });
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {course.length === 0 ? (
        <Typography variant="h5" color="textSecondary" style={{ margin: "20px" }}>
          No Courses Available
        </Typography>
      ) : (
        course.map((courseItem) => (
          <Course key={courseItem._id} course={courseItem} />
        ))
      )}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "20px" }}>
      <Card
        style={{
          width: "320px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "600",
            marginBottom: "10px",
            color: "#222",
          }}
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginBottom: "15px", minHeight: "40px" }}
        >
          {course.description}
        </Typography>

        <img
          src={course.imageLink}
          alt={course.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <Typography
          variant="subtitle1"
          style={{
            marginBottom: "20px",
            fontWeight: "500",
            color: "#555",
          }}
        >
          ₹ {course.price}
        </Typography>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            style={{
              flex: 1,
              marginRight: "10px",
              fontWeight: "500",
              backgroundColor: "#1976d2", // primary blue
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 4px 8px rgba(25, 118, 210, 0.4)",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1565c0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
            onClick={() => {
              navigate("/course/" + course._id);
            }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            style={{
              flex: 1,
              fontWeight: "500",
              backgroundColor: "#e53935", // softer red
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 4px 8px rgba(229, 57, 53, 0.4)",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e53935")}
            onClick={() => {
              fetch(
                `${import.meta.env.VITE_BACKEND_URL}/admin/courses/` + course._id,
                {
                  method: "DELETE",
                  body: JSON.stringify({
                    title: course.title,
                    description: course.description,
                    imageLink: course.imageLink,
                    published: true,
                  }),
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              ).then((res) => res.json());

              window.location = "/courses";
            }}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Courses;
