import { ConfigAttributes, TextAttributes } from './interfaces';
import reqmaker from './reqmaker';

export class Infobip{

    private auth: string;
    private sender_id: string;
    private url: string;

    constructor(configs: ConfigAttributes) {
        this.auth = Buffer.from(`${configs.username}:${configs.password}`).toString('base64');
        this.sender_id = configs.sender_id;
        this.url = configs.url;
    }

    async fetch_reports(){

        let reports;
        try{
            reports = await reqmaker('https://jgv89.api.infobip.com/sms/1/reports', 'GET', '', {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.auth}`
            });
        }catch(e){
          return e;  
        }
        return reports;

    }

    async send_sms(text: TextAttributes){

        let sms;
        try{
            sms = await reqmaker(this.url, 'POST', {
                from: this.sender_id,
                to: text.recipient,
                text: text.message
            }, {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.auth}`
            });
        }catch(e){
          return e;  
        }
        return sms;

    }
}