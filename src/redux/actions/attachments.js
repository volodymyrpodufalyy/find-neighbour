import {filesApi} from '../../utils/api'

const Actions = {
  setAttachments: items => ({
    type: "ATTACHMENTS:SET_ITEMS",
    payload: items
  }),
  removeAttachment: file => ({
    type: "ATTACHMENTS:REMOVE_ITEM",
    payload: file
  }),

  uploadFile: file => dispatch =>{
    filesApi.upload(file).then((date)=>{
      console.log(date)
      console.log('success')
    }).catch(e =>{
      console.log(e)
    })
}

};

export default Actions;
