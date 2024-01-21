import moment from 'moment'
class Order{
    constructor(id,item,date,orderInfo,totalAmount){
        this.id=id;
        this.item=item;
        this.date=date;
        this.orderInfo=orderInfo;
        this.totalAmount=totalAmount
    }
   
}

export default Order