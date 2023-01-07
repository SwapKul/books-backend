import { Joi } from "celebrate";

export default {
  user: {
    email: Joi.string().allow(""),
    password: Joi.string().min(6).max(32),
    user_id: Joi.string().trim(),
    username: Joi.string().trim(),
    mobile_no :Joi.string().trim(),
    first_name: Joi.string().allow(""),
    last_name: Joi.string().allow(""),
    city: Joi.string().trim(),
    country: Joi.string().trim(),
    dob:Joi.date(),
    gender:Joi.string().trim(),
    postcode: Joi.string().trim(),
    active: Joi.string().trim(),
    date_created: Joi.date(),
    date_modified: Joi.date(),
    userType:Joi.string(),
    secret:Joi.string(),
    token:Joi.string(),
    adminEmail:Joi.string(),
    adminName:Joi.string(),
    emp_id:Joi.string()
    
  },

  productCategory: {
    product_category_id: Joi.string().allow(""),
    product_category_name: Joi.string().allow(""),
    product_category_description: Joi.string().allow(""),
  },

  admin: {
    admin_id: Joi.string().allow(""),
    admin_name: Joi.string().allow(""),
    admin_password: Joi.string().allow(""),
    admin_mobile: Joi.number().allow(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  },

  profile: {
    board: Joi.string().allow(""),
    class: Joi.string().allow(""),
    class_id: Joi.string().allow(""),
    profile_image: Joi.string().allow("")
  },

  class: {
    class_id: Joi.string().allow(""),
    class_name: Joi.string().trim(),
    medium: Joi.string().trim(),
    active: Joi.number(),
    created_by: Joi.string().trim(),
    logo: Joi.string().allow(""),
    backgroud:Joi.string().allow("")
  },

  board: {
    board_id: Joi.string().trim(),
    board_name: Joi.string().trim(),
    active: Joi.number(),
    created_by: Joi.string().allow("")
  },

  medium: {
    medium_id: Joi.string().trim(),
    active: Joi.number(),
    medium_name: Joi.string().trim(),
    created_by: Joi.string().trim()
  },

  bookmark: {
    bookmark_id: Joi.string().trim(),
    active: Joi.number(),
    user_id: Joi.string().trim(),
    video_id: Joi.string().trim()
  },

  subject: {
    subject_id: Joi.string().trim(),
    subject: Joi.string().trim(),
    active: Joi.number(),
    created_by: Joi.string().trim(),
    logo: Joi.string().allow(""),
    colour:Joi.string().allow(""),
    backgroud:Joi.string().allow("")
  },

  topic: {
    topic_id: Joi.string().trim(),
    topic: Joi.string().trim(),
    class_id: Joi.string().trim(),
    subject_id: Joi.string().trim(),
    active: Joi.number(),
    created_by: Joi.string().trim(),
    logo: Joi.string().allow("")
  },
  userActivity: {
    activity_id: Joi.string().trim(),
    user_id: Joi.string().trim(),
    video_id: Joi.string().trim(),
    count: Joi.number(),
    active: Joi.number(),
    created_by: Joi.string().trim(),
    date_created: Joi.date(),
  },
  video:{
    thumbnail:Joi.string(),
    vidoe:Joi.object(),
    video_id : Joi.string()
  },



  test:{
    test_id:Joi.string(),
    test_name:Joi.string(),
    no_question:Joi.string(),
    total_time:Joi.string(),
    instruction:Joi.string(),
    subject_id:Joi.string(),
    class_id:Joi.string(),
    topic_id:Joi.string(),
    total_mark:Joi.string(),
    test_date:Joi.string(),
    test_question:Joi.array(),
   
    questionData :Joi.array()
  },

  permission:{
    id: Joi.string().trim(),
    permission:Joi.string().trim(),
    active:Joi.number(),
  },
  userPermission:{
    user_permission_id: Joi.string().trim(),
    permission_id: Joi.string().trim(),
    user_id:Joi.string().trim(),
    active:Joi.number(),

  },
  subtitle:{
    subtitle: Joi.string().allow(""),
    video_id:Joi.string(),
    filext:Joi.string().allow("")
  },
  banner:{
    banner_id : Joi.string()
  },

  questionData: {
    test_id:Joi.string(),
    question_id:Joi.string(),
    question:Joi.string(),
    question_image:Joi.string().allow(""),
    compulsory:Joi.number(),
    marks:Joi.number(),
    solutionDescription:Joi.string()
  },

  updateOption : {
    option_id:Joi.string(),
    option_image:Joi.string().allow(""),
    is_correct:Joi.number(),
  }


}



