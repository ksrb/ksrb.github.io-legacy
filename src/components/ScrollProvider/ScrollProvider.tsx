import { throttle } from "lodash";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { navbarHeight } from "src/components/Navbar/styles";
import {
  aboutListenerId,
  experiencesListenerId,
  providerListenerId,
  skillsListenerId,
} from "src/constants";
import { RequiredByElsePartial } from "src/types";

const context = createContext<ScrollProviderListenerMap>({});

const { Provider } = context;

type Listener = (scrollProviderListenerMap: ScrollProviderListenerMap) => void;

type ScrollProviderListener = {
  id: number;
  element?: HTMLElement;
  listener?: Listener;
  inViewPort?: boolean;
};

export type ScrollProviderListenerMap = {
  [key: number]: ScrollProviderListener;
};

/**
 * Checks if any part of the given element is in the viewport
 * From:
 * https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling#comment45659737_22480938
 * @param element
 */
function isElementInViewport(element: HTMLElement) {
  const { top, bottom } = element.getBoundingClientRect();
  return top < window.innerHeight && bottom >= navbarHeight;
}

class ScrollManager {
  scrollProviderListenerMap: ScrollProviderListenerMap = {};

  addListener(
    scrollProviderListener: RequiredByElsePartial<ScrollProviderListener, "id">,
  ) {
    const { id } = scrollProviderListener;

    if (!this.scrollProviderListenerMap[id]) {
      this.scrollProviderListenerMap[id] = {
        ...scrollProviderListener,
      };
    }

    Object.entries(scrollProviderListener).forEach(([key, value]) => {
      // @ts-ignore
      this.scrollProviderListenerMap[id][key] = value;
    });
  }

  callListener(id: ScrollProviderListener["id"]) {
    const { listener } = this.scrollProviderListenerMap[id];
    if (listener) {
      listener(this.scrollProviderListenerMap);
    }
  }

  callListeners() {
    let hasChanges = false;
    Object.values(this.scrollProviderListenerMap).forEach(
      (scrollProviderListener) => {
        const { element } = scrollProviderListener;

        let onScreen = scrollProviderListener.inViewPort;
        if (element) {
          onScreen = isElementInViewport(element);
        }

        if (onScreen !== scrollProviderListener.inViewPort) {
          scrollProviderListener.inViewPort = onScreen;
          hasChanges = true;
        }
      },
    );

    if (hasChanges) {
      Object.values(this.scrollProviderListenerMap).forEach(({ id }) =>
        this.callListener(id),
      );
    }
  }

  addWindowScrollListener() {
    window.addEventListener(
      "scroll",
      throttle(
        () => this.callListeners(),
        // 30 FPS
        1000 / 30,
      ),
    );
  }
}

export const scrollManager = new ScrollManager();
scrollManager.addListener({ id: skillsListenerId });
scrollManager.addListener({ id: experiencesListenerId });
scrollManager.addListener({ id: aboutListenerId });

export function useScrollProviderRefCallback(id: ScrollProviderListener["id"]) {
  scrollManager.addListener({ id });

  return useCallback(
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }
      scrollManager.addListener({ id, element });
    },
    [id],
  );
}

export function useScrollProvider() {
  return useContext(context);
}

export type ScrollProviderProps = {
  scrollProviderRef: ReturnType<typeof useScrollProviderRefCallback>;
};

export function withScrollProvider<T extends ScrollProviderProps>(
  Component: FC<T>,
  id: number,
) {
  const Wrapper: FC<Omit<T, "scrollProviderRef">> = (props) => {
    scrollManager.addListener({ id });
    const ref = useScrollProviderRefCallback(id);

    // Typecasting used as generic type cannot be determined see
    // https://stackoverflow.com/a/60735856
    return <Component {...(props as T)} scrollProviderRef={ref} />;
  };
  return Wrapper;
}

const ScrollProvider: FC = ({ children }) => {
  const [
    scrollProviderListenerMap,
    setScrollProviderListenerMap,
  ] = useState<ScrollProviderListenerMap>(
    scrollManager.scrollProviderListenerMap,
  );

  useEffect(() => {
    scrollManager.addWindowScrollListener();
    scrollManager.addListener({
      id: providerListenerId,
      listener: (scrollProviderListenerMap) => {
        setScrollProviderListenerMap({ ...scrollProviderListenerMap });
      },
    });
    scrollManager.callListeners();
  }, []);

  return <Provider value={scrollProviderListenerMap}>{children}</Provider>;
};

export default ScrollProvider;
