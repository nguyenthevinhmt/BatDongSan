import React, { useState } from 'react'
import { AuthService } from '../_services/authService';
import { RegisterType } from '@/shared/types/RegisterType';
import { ECommonStatus } from '@/shared/enums/CommonStatusEnum';

const Register = () => {
  // const [formData, setFormData] = useState<RegisterType>({
  //   username: '',
  //   email: '',
  //   password: '',
  //   fullname: '',
  //   phone: '',
  //   status: ECommonStatus.ACTIVE
  // });

  // const handleChange = () => {
  //   // const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = () => {
  //   //e.preventDefault();
  //   // Gửi dữ liệu đăng ký đến server hoặc xử lý theo ý của bạn
  //   console.log('Form Data:', formData);
  //   AuthService.Register(formData);
  // };
  
  return (
    <form>
      <label>
        Fullname:
        <input type="text" name="username" />
      </label>
      <label>
        Phone:
        <input type="text" name="username" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password"/>
      </label>

      <button>Register</button>
  </form>
  )
}

export default Register
