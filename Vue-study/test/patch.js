function patchnode (oldVnode, vnode) {
    if (oldVnode === vnode) {
        return
    }
    if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
        vnode.elm = oldVnode.elm
        vnode.componentInstance = oldVnode.componentInstance
        return
    }
    const elm = vnode.elm = oldVnode.elm
    const oldCh = oldVnode.children
    const ch = vnode.children

    if (vnode.text) {
        nodeOps.setTextContent(elm, vnode.text)
    } else {
        if (oldCh && ch && (oldCh !== ch)) {
            updateChildren(elm, oldCh, ch)
        } else if (ch) {
            // 只有ch存在，如果老节点是文本节点就先清掉
            // 然后将ch批量插入elm
            if (oldVnode.text) nodeOps.setTextContent(elm, '')
            addVnodes(elm, null, ch, 0, ch.length-1)
        } else if (oldCh) {
            removeVnodes(elm, oldCh, 0, oldCh.length-1)
        } else if (oldVnode.text) {
            nodeOps.setTextContent(elm, '')
        }
    }
}

function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, elmToMove, refElm

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!oldStartVnode) {
            // 当oldStartVnode或者oldEndVnode不存在时，向中间靠拢
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (!oldEndVnode) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            // oldStartVnode和newStartVnode比较，如果是sameVnode进行patch
            // 两个都向后移动一位
            patchnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // oldEndVnode和newEndVnode比较，如果是sameVnode进行patch
            // 两个都向前移动一位
            patchnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndVnode]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // oldStartVnode和newEndVnode一致的时候，oldStartVnode就移动到oldEndVNode的后面
            // oldStartVnode向后移一位
            // newEndVnode向前移一位
            patchnode(oldStartVnode, newEndVnode)
            nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newStartIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // oldEndVnode和newStartVnode一致的时候，oldEndVnode就插入到最前面
            // oldEndIdx向前移动一位
            // newStartIdx向后移动一位
            patchnode(oldEndVnode, newStartVnode)
            nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 以上情况都不符合
        }
    }
}