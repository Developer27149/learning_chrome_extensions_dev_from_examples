const _AnalysisCode = 'G-J0BNBT8YXG'

const _gap = []

_gap.push(['_setAccount', _AnalysisCode])
_gap.push(['trackPageview'])

function trackBtnClick(e) {
  _gap.push(['_trackEvent', e.target.id, 'clicked'])
}

document.addEventListener("onload", () => {
  const btns = document.querySelectorAll("button");
  for (const btn of btns) {
    btn.addEventListener("click", trackBtnClick)
  }
})
