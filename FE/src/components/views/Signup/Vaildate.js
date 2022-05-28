/**
 *
 * @author 조준영
 * @version 1.0.0
 * 작성일 2022-01-25
**/
function Vaildate(type, value) {
  let result = false
  if (type === 'idcheck') {
    if (/^[a-z0-9]{6,12}$/i.test(value)) {
      result= true
    } else {
      result= false
    }
  } else if (type === 'email') {
    if (!/^[0-9a-z]*@[0-9a-z]*\.[a-z]{2,3}$/i.test(value)) {
      result = false
    } else {
      result = true
    }
  } else if (type === 'name') {
    result = true
  }
  return result
}
export default Vaildate;