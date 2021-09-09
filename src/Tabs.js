export default {
  name: 'Tabs',
  data () {
    return {
      panes: [],
      currentName: ''
    }
  },
  methods: {
    renderPane () {
      const { default: slotsDefault} = this.$slots
      const paneSlots = slotsDefault.filter(vNode => vNode.componentOptions && vNode.componentOptions.Ctor.options.name === 'TabPane')
      console.log('paneSlots', paneSlots)
      const panes = paneSlots.map(paneSlot => {
        return paneSlot.componentInstance
      })
      this.panes = panes
    },
    setCurrentName (name) {
      this.currentName = name
    }
  },
  mounted() {
    this.renderPane()
    this.currentName = this.panes[0].label
  },
  render() {
    const { panes, currentName, setCurrentName } = this
    const { default: slotsDefault} = this.$slots

    console.log('panes', panes)
    return (<div>
      <ul style="display: flex">
        { panes && panes.map(pane => {
          return (<li style={{ cursor: 'pointer', width: '100px', textAlign: 'center', color: currentName === pane.label ? 'blue' : 'black' }} onClick={() => setCurrentName(pane.label)}>{ pane.label }</li>)
        }) }
      </ul>
      <div class="content" style="text-align: left; margin-top: 14px;">
      { slotsDefault }
      </div>
    </div>)
  },
}