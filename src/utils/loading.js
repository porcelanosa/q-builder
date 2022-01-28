import { ElLoading } from 'element-plus'
export const openFullScreen2 = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
  })
}
