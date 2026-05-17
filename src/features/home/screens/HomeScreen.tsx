import React, { useCallback } from 'react';
import { FlatList, View, StyleSheet, type ListRenderItem } from 'react-native';
import { SafeAreaLayout } from '@/components/layouts/SafeAreaLayout';
import { Text, Card, LoadingSpinner } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { spacing } from '@/theme/spacing';
import { useHomeData } from '../hooks/use-home-data';
import type { Post } from '../types/home.types';

const PostCard = React.memo(({ post }: { post: Post }): React.JSX.Element => {
  const { colors } = useTheme();
  return (
    <Card style={styles.card}>
      <Text variant="h3" numberOfLines={2}>
        {post.title}
      </Text>
      <Text variant="body" color={colors.textSecondary} numberOfLines={3} style={styles.body}>
        {post.body}
      </Text>
    </Card>
  );
});

export const HomeScreen = (): React.JSX.Element => {
  const { colors } = useTheme();
  const { data: posts, isLoading, isError, refetch } = useHomeData();

  const renderItem: ListRenderItem<Post> = useCallback(({ item }) => <PostCard post={item} />, []);

  const keyExtractor = useCallback((item: Post): string => item.id, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError) {
    return (
      <SafeAreaLayout>
        <View style={styles.center}>
          <Text variant="body" color={colors.error}>
            データの読み込みに失敗しました
          </Text>
        </View>
      </SafeAreaLayout>
    );
  }

  return (
    <SafeAreaLayout edges={['top']}>
      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onRefresh={refetch}
        refreshing={isLoading}
        ListHeaderComponent={
          <Text variant="h2" style={styles.heading}>
            ホーム
          </Text>
        }
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  list: { padding: spacing.lg, gap: spacing.md },
  card: { gap: spacing.sm },
  body: { marginTop: spacing.xs },
  heading: { marginBottom: spacing.lg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
