import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo we'll take care of everything
    read(existing = [], { args, cache }) {
      const { first, skip } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const items = existing.slice(skip, skip + first).filter(Boolean);

      if (items.length && items.length !== first && page === pages) {
        // Give items to cache (Apollo)
        return items;
      }

      if (items.length !== first) {
        // Fetch from network
        return false;
      }

      if (items.length) {
        // Give items to cache (Apollo)
        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      const merged = existing ? existing.slice(0) : [];
      const { skip } = args;
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
