(this.webpackJsonpsearch=this.webpackJsonpsearch||[]).push([[0],{71:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(14),c=n.n(i),o=(n(71),n(135)),u=n(54),s=n(17),l=n(132),d=n(131),j=n(136),m=n(31),b=function(e){if(!e)return Promise.resolve(null);var t=new URLSearchParams(Object(m.a)(Object(m.a)({},e),{},{partner:"skypicker",limit:10}));return fetch("https://api.skypicker.com/flights?".concat(t.toString())).then((function(e){return e.json()}))},p=function(e){return e?e.data.map((function(t){return{id:t.id,flyFrom:t.flyFrom,cityFrom:t.cityFrom,flyTo:t.flyTo,cityTo:t.cityTo,price:"".concat(t.price," ").concat(e.currency),dTimeUTC:t.dTimeUTC,aTimeUTC:t.aTimeUTC}})):null},h=n(125),f=n(121),O=n(126),T=n(8),x=function(e){var t=e.cityFrom,n=e.cityTo;return Object(T.jsx)(f.a,{variant:"outlined",children:Object(T.jsx)(h.a,{children:Object(T.jsxs)(O.a,{variant:"body2",component:"p",children:[t," ",">"," ",n]})})})},D=function(e){var t=e.searchParameters,n=Object(j.a)(["flightData",{searchParameters:t}],(function(){return b(t).then(p)})).data;return n?n.map((function(e){return Object(T.jsx)(x,{cityFrom:e.cityFrom,cityTo:e.cityTo})})):null};D.defaultProps={searchParameters:null};var E=D,v=n(129),y=n(130),R=n(128),g=n(34),N=n(133),A=n(134),I=n(55),S=function(e){return fetch("https://api.skypicker.com/locations?location_types=airport&term=".concat(e)).then((function(e){return e.json()}))},P=n.n(I)()((function(e){return S(e)}),200),U=function(e,t){var n=[];return t&&n.push(t),e&&e.locations?n.concat(e.locations):n},_=function(e){var t=e.inputLabel,n=e.onChange,a=e.name,i=Object(r.useState)(""),c=Object(s.a)(i,2),o=c[0],u=c[1],l=Object(r.useState)(null),d=Object(s.a)(l,2),b=d[0],p=d[1],h=Object(j.a)(["airportData",{inputValue:o,selectedAirport:b}],(function(){return P(o)})).data;return Object(T.jsx)(A.a,{options:U(h,b),getOptionLabel:function(e){return e.name},renderInput:function(e){return Object(T.jsx)(N.a,Object(m.a)(Object(m.a)({},e),{},{label:t,variant:"outlined"}))},onInputChange:function(e,t){u(t)},onChange:function(e,t){p(t),n&&n(a,t)},value:b})},C={ORIGIN:"origin",DESTINATION:"destination",DEPARTURE_DATE:"departureDate",RETURN_DATE:"returnDate"},F=Object(R.a)((function(e){return{paper:{marginTop:e.spacing(4)},form:{width:"100%"},submit:{margin:e.spacing(3,0,2)},formLine:{marginTop:e.spacing(2)}}})),k=function(e){var t=e.onSearchSubmitted,n=F(),r=Object(g.b)(),a=r.control,i=r.handleSubmit,c=r.setValue,o=r.formState.errors;return Object(T.jsxs)("div",{className:n.paper,children:[Object(T.jsx)(O.a,{component:"h1",variant:"h5",children:"Search Flights"}),Object(T.jsxs)("form",{onSubmit:i((function(e){return t(e)})),noValidate:!0,children:[Object(T.jsxs)(v.a,{container:!0,spacing:2,className:n.formLine,children:[Object(T.jsxs)(v.a,{item:!0,xs:12,sm:6,children:[Object(T.jsx)(g.a,{name:C.ORIGIN,control:a,defaultValue:null,rules:{required:!0},render:function(){return Object(T.jsx)(_,{name:C.ORIGIN,inputLabel:"From",onChange:c})}}),o[C.DESTINATION]&&"From is required"]}),Object(T.jsxs)(v.a,{item:!0,xs:12,sm:6,children:[Object(T.jsx)(g.a,{name:C.DESTINATION,control:a,defaultValue:null,rules:{required:!0},render:function(){return Object(T.jsx)(_,{name:C.DESTINATION,inputLabel:"To",onChange:c})}}),o[C.DESTINATION]&&"To is required"]})]}),Object(T.jsxs)(v.a,{container:!0,spacing:2,className:n.formLine,children:[Object(T.jsxs)(v.a,{item:!0,xs:12,sm:6,children:[Object(T.jsx)(g.a,{name:C.DEPARTURE_DATE,control:a,defaultValue:"",rules:{required:!0},render:function(e){var t=e.field,n=t.onChange,r=t.value;return Object(T.jsx)(N.a,{name:C.DEPARTURE_DATE,label:"Departure",type:"date",style:{width:"100%"},InputLabelProps:{shrink:!0},inputProps:{"data-testid":C.DEPARTURE_DATE},onChange:n,value:r})}}),o[C.DEPARTURE_DATE]&&"Departure date is required"]}),Object(T.jsxs)(v.a,{item:!0,xs:12,sm:6,children:[Object(T.jsx)(g.a,{name:C.RETURN_DATE,control:a,defaultValue:"",rules:{required:!0},render:function(e){var t=e.field,n=t.onChange,r=t.value;return Object(T.jsx)(N.a,{name:C.RETURN_DATE,label:"Return",type:"date",style:{width:"100%"},InputLabelProps:{shrink:!0},inputProps:{"data-testid":C.RETURN_DATE},onChange:n,value:r})}}),o[C.RETURN_DATE]&&"Return date is required"]})]}),Object(T.jsx)(y.a,{"data-testid":"submitButton",className:n.submit,type:"submit",fullWidth:!0,variant:"contained",color:"primary",children:"Search"})]})]})},L=function(e){return new Date(e).toJSON().slice(0,10).split("-").reverse().join("/")},q=function(e){var t,n;return{fly_from:null===(t=e.origin)||void 0===t?void 0:t.code,fly_to:null===(n=e.destination)||void 0===n?void 0:n.code,dateFrom:L(e.departureDate),dateTo:L(e.departureDate),return_from:L(e.returnDate),return_to:L(e.returnDate)}},w=function(){var e=Object(r.useState)(null),t=Object(s.a)(e,2),n=t[0],a=t[1];return Object(T.jsxs)(d.a,{component:"main",maxWidth:"sm",children:[Object(T.jsx)(l.a,{}),Object(T.jsx)(k,{onSearchSubmitted:function(e){return a(q(e))}}),Object(T.jsx)(E,{searchParameters:n})]})},V=Object(r.memo)(w),G=new o.a;c.a.render(Object(T.jsx)(a.a.StrictMode,{children:Object(T.jsx)(u.a,{client:G,children:Object(T.jsx)(V,{})})}),document.getElementById("root"))}},[[79,1,2]]]);
//# sourceMappingURL=main.ce7c9be4.chunk.js.map