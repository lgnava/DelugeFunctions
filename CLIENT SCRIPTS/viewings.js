// MICHAEL DOERRER
//Hay muchas cosas ya obsoletas
log("sample logging statement X")
ZDK.Page.getField("Company").setValue("Home Owner") // esto es lo nuevo

// EDWARD LOWE
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

// GET THE OPPORTUNITY -----------------------------------------------------------
var oppObj = ZDK.Form.Field.Read('Opportunity')
var Opportunity = ZDK.Apps.CRM.Deals.fetchById(oppObj.id);
// GET THE BUYER -----------------------------------------------------------------
var buyerID = Opportunity._Contact_Name_Lookup_Id
var Buyer = ZDK.Apps.CRM.Contacts.fetchById(buyerID)
var BuyerJson = { name: Buyer._First_Name + " " + Buyer._Last_Name, id: Buyer._id }
// UPDATE FIELDS ------------------------------------------------------------------
ZDK.Form.Field.Write('Name', Opportunity._Deal_Name + " viewing...")
ZDK.Form.Field.Write('Buying_Applicant', BuyerJson)


/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

log(ZDK.Form.Read())
// PROPERTY ------------------------------------------------------------------
var PropertyObj = ZDK.Form.Field.Read('Property')
var Property = ZDK.Apps.CRM.Properties.fetchById(PropertyObj.id);
log(Property)
// SELLER ------------------------------------------------------------------
var sellerID = Property._Seller_Lookup_Id
var Seller = ZDK.Apps.CRM.Contacts.fetchById(sellerID)
var SellerJson = { name: Seller._First_Name + " " + Seller._Last_Name, id: Seller._id }
// GET THE OPPORTUNITY -----------------------------------------------------------
var oppObj = ZDK.Form.Field.Read('Opportunity')
var Opportunity = ZDK.Apps.CRM.Deals.fetchById(oppObj.id);
// GET THE BUYER -----------------------------------------------------------------
var buyerID = Opportunity._Contact_Name_Lookup_Id
var Buyer = ZDK.Apps.CRM.Contacts.fetchById(buyerID)
var BuyerJson = { name: Buyer._First_Name + " " + Buyer._Last_Name, id: Buyer._id }
// UPDATE FIELDS ------------------------------------------------------------------
ZDK.Form.Field.Write('Name', Opportunity._Deal_Name + " viewing " + Property._Name)
ZDK.Form.Field.Write('Seller', SellerJson)
/**/ 


// LIOR
/** 
 * log("sample logging statement") --> can be used to print any data in the browser console.
 * ZDK module can be used for customising the UI and other functionalities.
 * return false to prevent <SAVE> action
**/

DealName = ""

var accObj = ZDK.Page.getField("Account_Name").getValue()
if (accObj !=  null) {
    var Account = ZDK.Apps.CRM.Accounts.fetchById(accObj.id)
    DealName = Account._Account_Name 
}

var contactObj = ZDK.Page.getField("Contact_Name").getValue()
if (contactObj != null) {
    var Contact = ZDK.Apps.CRM.Contacts.fetchById(contactObj.id)
    if (DealName != "") {
        DealName += " - " + Contact._First_Name + " " + Contact._Last_Name 
    } else {
        DealName = Contact._First_Name + " " + Contact._Last_Name 
    }
}

var Type = ZDK.Page.getField("Type").getValue()
if (Type != null) {
    if (DealName != "") {
        DealName += " - " + Type 
    } else {
        DealName = Type 
    }
}


ZDK.Page.getField("Deal_Name").setValue(DealName)


// ------------ Cosas nuevas de script
//log(subform);
log("HOLO");

//var Objeto = ZDK.Apps.CRM.Accounts.fetchById("4519062000001280027");
//log(Objeto);

/*
log(ola);
log(ola.Billing_City);
log(ola.Deleteme);*/ 

// traemos la subforma
var FullForm = ZDK.Page.getForm().getValues();
var subform = FullForm.InvoicesAndEstimates;
log(subform);
var line_items = new Array();
var line_item = new ZDK.Apps.CRM.InvoicesAndEstimates.Models.InvoicesAndEstimates();
log(line_item);
// para cada elemento traemos el producto y llenamos el valor
for (var i = 0; i < subform.length; i++){ 
    product_id = subform[i].Product_Name.id;
    productObj = ZDK.Apps.CRM.Products.fetchById(product_id);
    line_item.Product_Name = subform[i].Product_Name;
    line_item.Unit_Description = "holos";
    line_items.push(line_item);
}

log(line_items);
ZDK.Page.getField("InvoicesAndEstimates").setValue(line_items);