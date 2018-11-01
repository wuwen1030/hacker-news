
export function classNames(...args: any[]) {
  let classes = '';
  args.forEach( arg => {
    const argType = typeof arg;
    if ( argType === 'string' || argType === 'number') {
      classes += ' ' + arg;
    } else if (Array.isArray(arg)) {
      classes += ' ' + classNames.apply(null, arg);
    } else if (argType === 'object') {
      for (const key of Object.keys(arg)) {
        if (arg[key]) {
          classes += ' ' + key
        }
      }
    }
  });
  return classes.trimLeft();
}

export function host (url: string) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time: number) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time: number, label: string) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}