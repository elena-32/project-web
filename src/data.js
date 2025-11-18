const data = {
  users: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah@doctor.com",
      password: "doctor123",
      role: "doctor",
      specialization: "Cardiology",
      createdAt: "2025-01-15T10:00:00.000Z",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@patient.com",
      password: "patient123",
      role: "patient",
      age: 45,
      healthCondition: "Hypertension",
      createdAt: "2025-02-10T14:30:00.000Z",
    },
  ],
  posts: [
    {
      id: 1,
      title: "Understanding Diabetes Management",
      description:
        "I would like to discuss best practices for managing type 2 diabetes. What are your experiences with lifestyle changes and medication?",
      category: "Diabetes",
      authorId: 2,
      authorName: "John Smith",
      date: "2025-11-10T09:00:00.000Z",
      comments: [
        {
          id: 101,
          authorId: 1,
          authorName: "Dr. Sarah Johnson",
          text: "Regular exercise and a balanced diet are crucial. I recommend consulting with a nutritionist as well.",
          date: "2025-11-10T10:30:00.000Z",
        },
      ],
    },
    {
      id: 2,
      title: "New Research on Heart Disease Prevention",
      description:
        "Recent studies show promising results in preventive cardiology. Let's discuss the latest findings.",
      category: "Cardiology",
      authorId: 1,
      authorName: "Dr. Sarah Johnson",
      date: "2025-11-11T11:00:00.000Z",
      comments: [],
    },
  ],
  updates: [
    {
      id: 1,
      disease: "Hypertension",
      studyTitle: "Latest Guidelines for Blood Pressure Management",
      description:
        "New research indicates that maintaining blood pressure below 130/80 mmHg can significantly reduce cardiovascular risks.",
      link: "https://example.com/study1",
      authorId: 1,
      authorName: "Dr. Sarah Johnson",
      date: "2025-11-08T08:00:00.000Z",
    },
    {
      id: 2,
      disease: "Diabetes",
      studyTitle: "Breakthrough in Type 2 Diabetes Treatment",
      description:
        "A new combination therapy shows improved glucose control with fewer side effects compared to traditional treatments.",
      link: "https://example.com/study2",
      authorId: 1,
      authorName: "Dr. Sarah Johnson",
      date: "2025-11-09T12:00:00.000Z",
    },
  ],
};

export default data;
