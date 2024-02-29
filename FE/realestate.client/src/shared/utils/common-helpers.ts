export const skipNullParams = (data: any) => {
    let editData = {}
    if (data)
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          editData[key] = data[key]
        }
      })
    return editData
  }
  