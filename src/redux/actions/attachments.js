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
  setIsLoading: bool => ({
    type: "FILE:SET_IS_LOADING",
    payload: bool
  }),

  uploadFile: file => dispatch =>{
    dispatch(Actions.setIsLoading(true));

    filesApi.upload(file).then(({data})=>{
      dispatch(Actions.setAttachments(data))

      dispatch(Actions.setIsLoading(false));

    }).catch(e =>{
      console.log(e)
    })
}

};

export default Actions;
