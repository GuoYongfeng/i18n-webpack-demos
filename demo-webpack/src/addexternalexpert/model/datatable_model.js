let config={
  proxy:{
  get:"/cpu-expert/protectExpertInfo/externalexpert/query/page"
  },
  autoLoad:true,
  model:{
        meta: {
          pageSize:"",
          externalList:{
            type:'array',
            meta:{
              major_code:"",
              major_name:"",
              checkbox:"",
            }
          }

          }
        }
}

export default config
