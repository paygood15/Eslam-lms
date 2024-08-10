import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import CaategorySlice1 from "./CaregorySlice1";
import ExamSlice from "./ExamSlice";
import CourseAdminSlice from "./CourseAdminSlice"
import DoorSlice from "./DoorSlice";
import LessonSlice from "./LessonSlice";
import SectionSlice from "./SectionSlice";
import CourseStdSlice from "./CourseStdSlice";
import OrderSlice1 from "./OrderSlice1";
import ExamSlice1 from "./ExamSlice1";
import UserSliceAdmin from "./UserSliceAdmin"
import CodeCourse from "./CodeCourse";
import lessonFilesSlice from "./LessonFileSlice1"
import StaticSlice from "./StaticSlice";
const store = configureStore({
  reducer: {
    ExamSlice,
    CaategorySlice1,
     authSlice,
     CourseAdminSlice,
     DoorSlice,
     LessonSlice,
     SectionSlice,
     CourseStdSlice,
     OrderSlice1,
     ExamSlice1,
     UserSliceAdmin,
     CodeCourse,
     lessonFilesSlice,
     StaticSlice,
    }
});
// posts, auth
export default store;
