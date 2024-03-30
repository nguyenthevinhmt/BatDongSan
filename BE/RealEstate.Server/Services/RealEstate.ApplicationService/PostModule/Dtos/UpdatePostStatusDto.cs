﻿using RealEstate.ApplicationBase.Common.Validations;
using RealEstate.Utils.ConstantVariables.Post;

namespace RealEstate.ApplicationService.PostModule.Dtos
{
    public class UpdatePostStatusDto
    {
        public int Id { get; set; }
        /// <summary>
        /// Trạng thái
        /// </summary>
        public int PostStatus {  get; set; }
    }
}
