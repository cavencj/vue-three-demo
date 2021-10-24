<template>
  <div id="index">
    <div class="viewer-container" id="viewer-container"></div>
  </div>
</template>

<script>
import DT from './dt-sdk/packages/base'
import DtCore from './dt-sdk/packages/core'
DT.use(DtCore)
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    initViewer() {
      let viewer = new DT.Viewer('viewer-container')
      let layer = new DT.VectorLayer('layer')
      viewer.addLayer(layer)
      let x = -200
      for (let i = 0; i < 50; i++) {
        x += 10
        let polyline = new DT.Polyline(`${x},-100; ${x},100`)
        polyline.material = DT.Material.fromType(DT.Material.FlowLineType, {
          color: `rgb(  ${parseInt(String(Math.random() * 255))},
          ${parseInt(String(Math.random() * 255))}, ${parseInt(
            String(Math.random() * 255)
          )})`,
          percent: Math.random() * 0.2,
          speed: 20 * Math.random(),
          gradient: 0.01,
          isY: true
        })
        layer.addOverlay(polyline)
      }

      let circle = new DT.Circle('100,0,0,-90', 50)
      circle.material = DT.Material.fromType(DT.Material.ScanCircleType, {
        color: `rgb(  ${parseInt(String(Math.random() * 255))},
          ${parseInt(String(Math.random() * 255))}, ${parseInt(
          String(Math.random() * 255)
        )})`,
        speed: 20 * Math.random()
      })
      layer.addOverlay(circle)
      global.viewer = viewer
    }
  },
  mounted() {
    global.DT = DT
    DT.ready(this.initViewer)
  }
}
</script>

<style lang="scss">
@import './themes/index.scss';
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .viewer-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
