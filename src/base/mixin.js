export function BindMixin(handler) {
  function bind(...args) {
    console.log('this is from mixin.js', args)
    handler.call(this, 'handlers args')
    console.log('mixin.js ends')
  }

  return {
    mounted: bind
  }
}