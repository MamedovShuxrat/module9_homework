
const xmlStr = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

const parser = new DOMParser()

const xmlDOM = parser.parseFromString(xmlStr, 'text/xml')
let studentNodes = xmlDOM.querySelectorAll('student')

const res = {
    list: []
}

studentNodes.forEach(studentNode => {
    let nameNode = studentNode.querySelector('name')
    let xmlName = nameNode.querySelector('first').textContent
    let surName = nameNode.querySelector('second').textContent
    let age = xmlDOM.querySelector('age').textContent
    let prof = xmlDOM.querySelector('prof').textContent
   
    let langAttr = nameNode.getAttribute('lang')

    res.list.push({
        'name': `${xmlName} ${surName}`,
        'age': age,
        'prof': prof,
        'lang': langAttr
    })

})


console.log(res);



