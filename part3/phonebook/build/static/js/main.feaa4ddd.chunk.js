(this.webpackJsonpthe=this.webpackJsonpthe||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),s=n(14),u=n(2),l=n(3),i=n.n(l),m="/api/persons",f=function(){return i.a.get(m)},d=function(e){return i.a.post(m,e)},E=function(e,t){return i.a.put("".concat(m,"/").concat(e),t)},h=function(e){return i.a.delete("".concat(m,"/").concat(e))},b=function(e){return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:e.handleNewName,value:e.newName})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:e.handleNumber,value:e.number})),r.a.createElement("div",null,r.a.createElement("button",{onClick:e.handleSubmit,type:"submit"},"add"))))},p=function(e){return r.a.createElement("div",null,e.personArray.map((function(t,n){return r.a.createElement("p",{key:n},t.name," ",t.number," ",r.a.createElement("button",{onClick:function(){return n=t.name,a=t.id,void(window.confirm("Delete ".concat(n," ?"))&&h(a).catch((function(t){console.log(t),e.setErrorMessage("Information of ".concat(n," has already been removed from server"),"error"),setTimeout((function(){e.setErrorMessage(null)}),5e3)})).then((function(t){e.setPersons(e.persons.filter((function(e){return e.name!==n})))})));var n,a}},"Delete"))})))},v=function(e){return r.a.createElement("div",null,e.filterValue?r.a.createElement(p,{personArray:e.searchResults,setErrorMessage:e.setErrorMessage,setPersons:e.setPersons,persons:e.persons}):r.a.createElement(p,{personArray:e.persons,setErrorMessage:e.setErrorMessage,setPersons:e.setPersons,persons:e.persons}))},g=function(e){return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{onChange:e.handleFilterName,value:e.filterValue}))},w=function(e){var t=e.message;return"error"===e.status?r.a.createElement("div",{className:"error"},t):r.a.createElement("div",{className:"message"},t)},j=(n(37),function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),l=Object(u.a)(c,2),i=l[0],m=l[1],h=Object(a.useState)(""),p=Object(u.a)(h,2),j=p[0],O=p[1],N=Object(a.useState)(""),C=Object(u.a)(N,2),y=C[0],S=C[1],k=Object(a.useState)(""),M=Object(u.a)(k,2),P=M[0],L=M[1],A=Object(a.useState)(""),V=Object(u.a)(A,2),D=V[0],T=V[1];Object(a.useEffect)((function(){f().then((function(e){o(e.data)}))}),[i,j]);var F=function(e){var t=n.filter((function(t){return t.name.toLowerCase().includes(e)}));L(t)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),D&&r.a.createElement(w,{message:D}),r.a.createElement(g,{handleFilterName:function(e){var t=e.target.value;S(t.toLowerCase()),F(y)},filterValue:y}),r.a.createElement("h3",null,"Add a new "),r.a.createElement(b,{handleNewName:function(e){m(e.target.value)},newName:i,handleNumber:function(e){O(e.target.value)},number:j,handleSubmit:function(e){if(e.preventDefault(),i.length>0&&j.length>0)if(n.some((function(e){return e.name.toLowerCase()===i.toLowerCase()}))){if(window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one"))){var t=n.find((function(e){return e.name.toLowerCase()===i.toLowerCase()}));E(t.id,{name:i,number:j}).then((function(){T("Edited ".concat(i),"success"),setTimeout((function(){T(null)}),5e3)}))}m(""),O("")}else d({name:i,number:j}).then((function(e){o(n.concat(e)),T("Added ".concat(i),"success"),setTimeout((function(){T(null)}),5e3),m(""),O("")}))}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(v,Object(s.a)({filterValue:y,searchResults:P,persons:n,setErrorMessage:T,setPersons:o},"persons",n)))}),O=function(){return r.a.createElement("div",null,r.a.createElement(j,null))};c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.feaa4ddd.chunk.js.map