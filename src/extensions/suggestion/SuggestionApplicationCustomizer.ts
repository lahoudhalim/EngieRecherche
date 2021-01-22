import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { Trie } from "prefix-trie-ts";
import {  SPFxAdalClient } from '@pnp/common';

import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';


import * as strings from 'SuggestionApplicationCustomizerStrings';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


const LOG_SOURCE: string = 'SuggestionApplicationCustomizer';

var trie;

let a  = document.getElementsByClassName("_3X3KIHRvQlB_k1KQr3703K");
a[0].setAttribute("ID", "searchID");

let  e :HTMLInputElement= document.querySelector('#sbcId > form > input');
 //e.setAttribute("onchange","{handleChange}");
//  e.addEventListener('click',(event)=>{
//    console.log("test1231")
//   let dropdown = document.getElementById("ms-searchux-popup-0");
//   console.log(dropdown);
//  });
 e.addEventListener('input',(event)=>{
   console.log("test changes2");
   console.log( trie.getPrefix(e.value));
  let dropdown = document.getElementById("ms-searchux-popup-0");
  console.log(dropdown);
  
 });
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISuggestionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SuggestionApplicationCustomizer
  extends BaseApplicationCustomizer<ISuggestionApplicationCustomizerProperties> {

 
  public async onInit(): Promise<void> {
   
    
   
  
    console.log("test 2.5");
  
    //Dialog.alert(`Hello test`);
    sp.setup({​​​​​​​
      sp: {​​​​​​​
      baseUrl: "https://engie.sharepoint.com/sites/S365Pro/",
      fetchClientFactory: () => {​​​​​​​
      return new SPFxAdalClient(this.context);
      }​​​​​​​,
      headers: {​​​​​​​
      "Accept": "application/json;odata=verbose",
      "X-Something": "header-value",
    }​​​​​​​
    }​​​​​​​,
    spfxContext: this.context,
    }​​​​​​​);

    let test1: any[] = [];
     await sp.web.lists.getById("aed5eafc-ae52-415c-af2d-100ba3f5f9bd").items.get().then((items :any[])=>{
       console.log(items);
      for (let i = 0 ; i< items.length ; i ++){
        test1.push(items[i]["Title"]);
      }
      });
    console.log(test1);
    console.log("new version 2.2");

     trie = new Trie(test1);
    
   console.log(trie.getPrefix("I")) // <= ["john","jeb"]
   
   
    //element.onchange = (e: React.FormEvent<HTMLInputElement>) => {​​​​​​​const newValue = e.currentTarget.value;}
   
    
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello Halim from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }
   public prediction(){
     console.log('testHalim')
   } 
}


