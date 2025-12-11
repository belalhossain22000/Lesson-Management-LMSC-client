



# 📘 **LMSC E-Learning Frontend**

This is the **frontend client** for the LMSC Learning Management System.
It implements both the **Student** and **Teacher** flows required in the technical task, with a focus on clarity, usability, and correct API integration.

---

## 🛠 **Tech Stack**

* **Next.js 14 (App Router)**
* **TypeScript**
* **React Hooks**
* **ShadCN UI + TailwindCSS**
* **JWT-based simple authentication**
* **REST API integration using fetch**

The project is intentionally kept simple and easy to run locally, as required in the task instructions.

---

## 🚀 **Setup & Run Instructions**

### **1. Clone the repo**

```sh
git clone https://github.com/belalhossain22000/Lesson-Management-LMSC-client.git
cd Lesson-Management-LMSC-client
```

### **2. Install dependencies**

```sh
npm install
```

### **3. Add environment variable**

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://lesson-management-lmsc-server.vercel.app/api/v1
```

### **4. Run the app**

```sh
npm run dev
```

The app will run at:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 **Sample Login Instructions**

For this assignment, authentication is intentionally **minimal**, as allowed by the guidelines.

### **Student Login**

1. Click **"Login as Student"**
2. Choose one student from the list, e.g.:

   * `studentA@example.com`
   * `studentB@example.com`

### **Teacher Login**

1. Click **"Login as Teacher"**
2. Choose one teacher from the list, e.g.:

   * `alice@lmsc.org`
   * `charlie@lmsc.org`

A JWT token is returned by the backend and stored in memory via a custom `AuthContext`.

---

## 🧪 **Test Commands**

The task does not require automated tests, but if added later:

```sh
npm run test
```

Current implementation focuses on clarity and correct flow behavior.

---

## 📌 **Features Implemented**

### 👨‍🎓 Student

* View all lessons (with search + pagination)
* Open lesson detail
* Watch lesson video
* Take quiz → submit → receive score
* Submit task
* Dashboard with:

  * Total lessons
  * Completed lessons
  * Average score
  * Learning hours (placeholder)

### 👩‍🏫 Teacher

* View teacher-specific lessons
* Dashboard stats:

  * Total lessons
  * Students engaged
  * Quiz submissions
  * Task submissions
* Engagement screen:

  * Viewed status
  * Quiz submitted + score
  * Task submitted + mark
* View quiz results
* View + grade task submissions

All flows work end-to-end with the backend.

---

## assumptions

Since the task intentionally allows flexibility, the following assumptions were made:

1. Simple login (`email + role`) is acceptable—no passwords required.
2. Students can make **one quiz attempt** and **one task submission** per lesson.
3. Viewing a lesson counts as “engagement viewed.”
4. Teacher can update a task mark anytime and the latest mark is final.
5. Pagination is server-driven (`page`, `limit`) and defaults to 10.
6. Search applies to lesson title and description.
7. UI does not need pixel-perfect design; usability is prioritized.
8. Stats such as learning hours are placeholders unless provided by the backend.
9. Teacher sees only lessons that belong to them.
10. Lesson content (videos/quizzes/tasks) is seeded and static for this assignment.

---

## 🚧 Known Limitations / What I’d Do With More Time

* Add unit tests and integration tests.
* Improve mobile responsiveness.
* Persist login session using cookies instead of in-memory context.
* Add skeleton loaders and better error UI states.
* Add lesson creation and editing tools for teachers.
* Improve accessibility and keyboard navigation.
* Add filtering by completion, subject, or teacher.

---

## 📬 Submission

A public GitHub repository is provided along with this README.
All setup instructions and assumptions needed to run and evaluate the task are included as required.


