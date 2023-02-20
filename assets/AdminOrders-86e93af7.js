import{k as x,l as h,n as $,_ as y,o as a,c as n,a as e,t as l,g as E,F as m,f as k,i as w,q as P,m as T,r as v,p as b,h as g,b as M}from"./index-df4d67d3.js";import{M as C}from"./bootstrap.esm-434bcbc7.js";const{VITE_APP_URL:f,VITE_APP_PATH:O}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"wweilin",BASE_URL:"/Vue-week7",MODE:"production",DEV:!1,PROD:!0,SSR:!1},p=x("backOrdersStore",{state:()=>({orders:[],pages:{},tempOrder:{}}),actions:{async getOrders(t=1){const d=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");h.defaults.headers.common.Authorization=d,await h.get(`${f}v2/api/${O}/admin/orders?page=${t}`).then(s=>{const{orders:r,pagination:i}=s.data;this.orders=r,this.pages=i}).catch(s=>alert(s.response.data.message))},dateFormate(t){const d=new Date(t);return`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`},combineProducts(t){let d="";const s=Object.keys(t);let r;return s.length>1?s.forEach(i=>{r=t[i].product,d+=` ${r.title} 數量 ${r.num} 個 /`}):s.forEach(i=>{r=t[i].product,d+=`${r.title} 數量 ${r.num} 個`}),d.length>20?d.substring(0,20)+"...":d},isPaidChange(t){let d=t;const s=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");h.defaults.headers.common.Authorization=s,d.is_paid?d.paid_date=new Date().getTime():d.is_paid||(d.paid_date=""),h.put(`${f}v2/api/${O}/admin/order/${t.id}`,{data:d}).then(()=>{this.getOrders(),alert("修改成功!")}).catch(r=>alert(r.response.data.message))},currency(t){return`${parseInt(t,10).toFixed(0).replace(/./g,(s,r,i)=>r&&s!=="."&&(i.length-r)%3===0?`, ${s}`.replace(/\s/g,""):s)}`},delOrder(t,d){h.delete(`${f}v2/api/${O}/admin/order/${t.id}`).then(()=>{this.getOrders(),alert("訂單已刪除!"),d.hide()}).catch(s=>alert(s.response.data.message))}}}),V={props:["tempOrder"],methods:{...$(p,["dateFormate","currency","isPaidChange"])}},A={class:"modal-content border-0"},F=e("div",{class:"modal-header bg-dark text-white"},[e("h5",{id:"productModalLabel",class:"modal-title"},[e("span",null,"詳細資訊")]),e("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),S={class:"modal-body"},L={class:"row"},N={class:"col-md-4"},U=e("h4",null,"用戶資訊",-1),I={class:"table"},R={key:0},B=e("th",{style:{width:"100px"}},"姓名",-1),z=e("th",null,"Email",-1),j=e("th",null,"電話",-1),q=e("th",null,"地址",-1),H={class:"col-md-8"},K=e("h4",null,"訂單細節",-1),Y={class:"table"},G=e("th",{style:{width:"100px"}},"訂單編號",-1),J=e("th",null,"下單時間",-1),Q=e("th",null,"付款時間",-1),W={key:0},X={key:1},Z={key:2},ee=e("th",null,"付款狀態",-1),te={key:0,class:"text-success"},se={key:1,class:"text-muted"},de=e("th",null,"總金額",-1),oe=e("h3",null,"選購商品",-1),le={class:"table"},ae=e("thead",null,[e("tr")],-1),ne={class:"text-end"},re={class:"d-flex justify-content-end"},ie={class:"form-check"},ce={class:"form-check-label",for:"flexCheckDefault"},ue={key:0},he={key:1},_e={class:"modal-footer"},me=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function pe(t,d,s,r,i,_){return a(),n("div",A,[F,e("div",S,[e("div",L,[e("div",N,[U,e("table",I,[s.tempOrder.user?(a(),n("tbody",R,[e("tr",null,[B,e("td",null,l(s.tempOrder.user.name),1)]),e("tr",null,[z,e("td",null,l(s.tempOrder.user.email),1)]),e("tr",null,[j,e("td",null,l(s.tempOrder.user.tel),1)]),e("tr",null,[q,e("td",null,l(s.tempOrder.user.address),1)])])):E("",!0)])]),e("div",H,[K,e("table",Y,[e("tbody",null,[e("tr",null,[G,e("td",null,l(s.tempOrder.id),1)]),e("tr",null,[J,e("td",null,l(t.dateFormate(s.tempOrder.create_at)),1)]),e("tr",null,[Q,e("td",null,[s.tempOrder.paid_date?(a(),n("span",W,l(t.dateFormate(s.tempOrder.paid_date)),1)):s.tempOrder.paid_date?(a(),n("span",Z,"時間不正確")):(a(),n("span",X))])]),e("tr",null,[ee,e("td",null,[s.tempOrder.is_paid?(a(),n("strong",te,"已付款")):(a(),n("span",se,"尚未付款"))])]),e("tr",null,[de,e("td",null," $NT "+l(t.currency(s.tempOrder.total)),1)])])]),oe,e("table",le,[ae,e("tbody",null,[(a(!0),n(m,null,k(s.tempOrder.products,c=>(a(),n("tr",{key:c.id},[e("th",null,l(c.product.title),1),e("td",null,l(c.qty)+" / "+l(c.product.unit),1),e("td",ne," $NT "+l(t.currency(c.final_total)),1)]))),128))])]),e("div",re,[e("div",ie,[w(e("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":d[0]||(d[0]=c=>s.tempOrder.is_paid=c)},null,512),[[P,s.tempOrder.is_paid]]),e("label",ce,[s.tempOrder.is_paid?(a(),n("span",ue,"已付款")):(a(),n("span",he,"未付款"))])])])])])]),e("div",_e,[me,e("button",{type:"button",class:"btn btn-success",onClick:d[1]||(d[1]=c=>t.isPaidChange(s.tempOrder))}," 修改付款狀態 ")])])}const be=y(V,[["render",pe]]),ge={props:["tempOrder","delOrderModal"],methods:{...$(p,["delOrder"])}},fe={class:"modal-content border-0"},Oe=e("div",{class:"modal-header bg-danger text-white"},[e("h5",{id:"delProductModalLabel",class:"modal-title"},[e("span",null,"刪除訂單")]),e("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),ke=e("div",{class:"modal-body"}," 是否刪除訂單？ (刪除後將無法恢復)。 ",-1),$e={class:"modal-footer"},ye=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function ve(t,d,s,r,i,_){return a(),n("div",fe,[Oe,ke,e("div",$e,[ye,e("button",{type:"button",class:"btn btn-danger",onClick:d[0]||(d[0]=c=>t.delOrder(s.tempOrder,s.delOrderModal))}," 確認刪除 ")])])}const Me=y(ge,[["render",ve]]),Ce={data(){return{orderModal:null,delOrderModal:null,isNew:!1,tempOrder:{}}},computed:{...T(p,["orders","pages"])},methods:{...$(p,["getOrders","dateFormate","combineProducts","isPaidChange"]),openModal(t,d){t==="edit"?(this.tempOrder={...d},this.isNew=!1,this.orderModal.show()):t==="delete"&&(this.tempOrder={...d},this.delOrderModal.show())}},components:{OrderModal:be,DelOrderModal:Me},mounted(){this.getOrders(),this.orderModal=new C("#orderModal"),this.delOrderModal=new C("#delOrderModal")}},we={class:"table"},Pe=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"購買時間"),e("th",{scope:"col"},"Email"),e("th",{scope:"col"},"購買款項"),e("th",{scope:"col"},"應付金額"),e("th",{scope:"col"},"是否付款"),e("th",{scope:"col"},"編輯")])],-1),De={class:"form-check form-switch"},xe=["onChange","onUpdate:modelValue"],Ee={class:"form-check-label",for:"flexSwitchCheckDefault"},Te={class:"btn-group"},Ve=["onClick"],Ae=["onClick"],Fe={"aria-label":"Page navigation example"},Se={class:"pagination"},Le=e("span",{"aria-hidden":"true"},"«",-1),Ne=[Le],Ue=["onClick"],Ie=e("span",{"aria-hidden":"true"},"»",-1),Re=[Ie],Be={id:"orderModal",ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"},ze={class:"modal-dialog modal-xl"},je={id:"delOrderModal",ref:"delOrderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"delOrderModalLabel","aria-hidden":"true"},qe={class:"modal-dialog"};function He(t,d,s,r,i,_){const c=v("OrderModal"),D=v("DelOrderModal");return a(),n(m,null,[e("table",we,[Pe,e("tbody",null,[(a(!0),n(m,null,k(t.orders,o=>(a(),n("tr",{key:o.id},[e("td",null,l(t.dateFormate(o.create_at)),1),e("td",null,l(o.user.email),1),e("td",null,l(t.combineProducts(o.products)),1),e("td",null,l(o.total),1),e("td",null,[e("div",De,[w(e("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"flexSwitchCheckDefault",onChange:u=>t.isPaidChange(o),"onUpdate:modelValue":u=>o.is_paid=u},null,40,xe),[[P,o.is_paid]]),e("label",Ee,l(o.is_paid?"已付款":"未付款"),1)])]),e("td",null,[e("div",Te,[e("button",{type:"button",class:"btn btn-outline-success btn-sm",onClick:u=>_.openModal("edit",o)}," 編輯 ",8,Ve),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:u=>_.openModal("delete",o)}," 刪除 ",8,Ae)])])]))),128))])]),e("nav",Fe,[e("ul",Se,[e("li",{class:b(["page-item",{disabled:!t.pages.has_pre}])},[e("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:d[0]||(d[0]=g(o=>t.getOrders(t.pages.current_page-1),["prevent"]))},Ne)],2),(a(!0),n(m,null,k(t.pages.total_pages,o=>(a(),n("li",{class:b(["page-item",{active:o===t.pages.current_page}]),key:o+"page"},[e("a",{class:"page-link",href:"#",onClick:g(u=>t.getOrders(o),["prevent"])},l(o),9,Ue)],2))),128)),e("li",{class:b(["page-item",{disabled:!t.pages.has_next}])},[e("a",{class:"page-link",href:"#","aria-label":"Next",onClick:d[1]||(d[1]=g(o=>t.getOrders(t.pages.current_page+1),["prevent"]))},Re)],2)])]),e("div",Be,[e("div",ze,[M(c,{"temp-order":i.tempOrder},null,8,["temp-order"])])],512),e("div",je,[e("div",qe,[M(D,{"temp-order":i.tempOrder,"del-order-modal":i.delOrderModal},null,8,["temp-order","del-order-modal"])])],512)],64)}const Ge=y(Ce,[["render",He]]);export{Ge as default};
